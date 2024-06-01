# django
from django.urls import path, include
# 외부라이브러리
from rest_framework_simplejwt import views as jwt_views
# 앱내 import
from .views import UserLoginView, UserRegistrationView, UserOwnList, UserModify

urlpatterns = [
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserRegistrationView.as_view(), name='회원가입'),
    path('login/',UserLoginView.as_view(), name='로그인/로그아웃'),
    path('api-auth/', include('rest_framework.urls')),
    path('mypage/', UserOwnList.as_view(), name='마이페이지'),
    path('mypage/modify/', UserModify.as_view()),
]
