from sqlite3 import Date
from django.contrib.auth.models import User, Group
from django.db.models import Count

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from social.service import DefaultPagination
from social.models import Post, Like
from .serializers import LikeByDateSerializer, LikeSerializer, UserSerializerWithToken, PostSerializer, UserSerializer

from django.contrib.auth.hashers import make_password
from rest_framework import status

from datetime import date


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows posts to be viewed or edited
    """

    permission_classes_by_action = {'create': [
        IsAuthenticated], 'destroy': [IsAuthenticated]}
    pagination_class = DefaultPagination
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def destroy(self, request, *args, **kwargs):
        """Only post author and admin can delete post"""
        if request.user.id == Post.objects.get(id=kwargs['pk']).author.id or request.user.is_staff:
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'This is not your post'}, status=status.HTTP_403_FORBIDDEN)

    def create(self, request):
        """Post creation"""
        data = request.data
        user = request.user

        post = Post.objects.create(
            title=data['title'], text=data['text'], author=user)

        return Response({"detail": 'Post created'})

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def like(self, request, pk):
        """Action to like the post"""
        user = request.user
        post = self.get_object()

        like = Like.objects.filter(post=post, user=user)

        if like.exists():
            return Response({'detail': 'You already liked this post'}, status=status.HTTP_403_FORBIDDEN)

        else:
            Like.objects.create(
                post=post,
                user=user,
            )
            return Response({"detail": f'Post {pk} liked'})

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def unlike(self, request, pk):
        """Action to remove like from the post"""
        user = request.user
        post = self.get_object()

        like = Like.objects.filter(post=post, user=user)

        if not like.exists():
            return Response({'detail': 'You didn\'t liked this post'}, status=status.HTTP_403_FORBIDDEN)

        else:
            like.delete()
            return Response({'detail': f'Post {pk} unliked'})

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], url_path='user-posts')
    def list_user_posts(self, request):
        """Action to list all post, from one user"""
        user = request.user
        posts = self.get_queryset().filter(author=user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class UserAnalyticsViewSet(viewsets.ViewSet):
    """
    API endpoint that allows view analytics
    """
    pagination_class = DefaultPagination
    permission_classes_by_action = {
        'create': [IsAuthenticated],
        'destroy': [IsAuthenticated],
        'retrieve': [IsAuthenticated]
    }

    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]

    def retrieve(self, request, pk=None):
        post = Post.objects.get(id=pk)
        if post.author != request.user:
            return Response({'detail': 'You are not allowed to view this post'}, status=status.HTTP_403_FORBIDDEN)
        date_from = request.query_params.get('date_from') or post.created_at
        date_to = request.query_params.get('date_to') or date.today()

        likes = Like.objects.filter(post=post, created_at__range=[
                                    date_from, date_to]).order_by('created_at').values('created_at').annotate(total=Count('id'))

        serializer = LikeByDateSerializer(likes, many=True)
        return Response({'data': serializer.data, 'post_created_date': post.created_at, 'today_date': date.today() ,'date_from':date_from, 'date_to': date_to})

    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)
