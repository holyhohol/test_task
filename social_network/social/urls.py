from django.urls import path
from .views import MyTokenObtainPairView, RegisterView


urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', RegisterView.as_view(), name='register'),
    #path('profile/', views.getUserProfile, name='user-profile'),
    #path('profile/update/', views.updateUserProfile, name='users-profile-update'),
]
