from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from social.models import Post, Like
from .serializers import UserSerializerWithToken, PostSerializer, UserSerializer

from django.contrib.auth.hashers import make_password
from rest_framework import status


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

    permission_classes_by_action = {'create': [IsAuthenticated], 'destroy': [IsAuthenticated]}

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def destroy(self, request, *args, **kwargs):
        if request.user.id == Post.objects.get(id=kwargs['pk']).author.id or request.user.is_staff:
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'This is not your post'}, status=status.HTTP_403_FORBIDDEN)

    def create(self, request):
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
        user = request.user
        posts = self.get_queryset().filter(author=user)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
