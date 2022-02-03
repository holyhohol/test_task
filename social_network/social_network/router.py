from social.api.viewsets import UserAnalyticsViewSet, PostViewSet, UserViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('posts', PostViewSet, 'posts')
router.register('users', UserViewSet, 'users')
router.register('posts/analytic', UserAnalyticsViewSet, 'analytic')
