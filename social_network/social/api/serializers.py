from django.contrib.auth.models import User
from rest_framework import serializers
from social.models import Post, Like, Log
from rest_framework_simplejwt.tokens import RefreshToken


class UserSerializer(serializers.ModelSerializer):
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name', 'isAdmin']

    def get_isAdmin(self, obj):
        return obj.is_staff

class AdminUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'last_login', 'username', 'first_name', 'last_name']

class AdminActionsSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Log
        fields = "__all__"

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email',
                  'first_name', 'last_name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


class PostUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'first_name')


class PostSerializer(serializers.ModelSerializer):
    author = PostUserSerializer(read_only=True)
    likes = serializers.SerializerMethodField()
    users_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'title', 'text', 'created_at',
                  'author', 'likes', 'users_liked')

    def get_likes(self, obj):
        return Like.objects.filter(post=obj.id).count()

    def get_users_liked(self, obj):
        likes = Like.objects.filter(post=obj.id)
        return (like.user.id for like in likes)

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = "__all__"

class LikeByDateSerializer(serializers.Serializer):
    created_at = serializers.DateField()
    total = serializers.IntegerField()