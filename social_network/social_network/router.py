from social.api.viewsets import PostViewSet, UserViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('posts', PostViewSet, 'posts')
router.register('users', UserViewSet, 'users')

