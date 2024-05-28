# django
from django.urls import path
# 앱 내 import 
from .views import PerformanceList, PerformanceCreate, PerformanceDetail, PerformanceModify, CategoryList, CategoryDetail, ImageCreate, ImageDetail, PerformanceCategoryDetail


urlpatterns = [
    path('performance/create/', PerformanceCreate.as_view(), name='공연 생성'),
    path('performance/', PerformanceList.as_view(), name='공연 리스트 확인'),
    path('performance/detail/<int:pk>/', PerformanceDetail.as_view(), name='공연 세부정보'),
    path('performance/modify/<int:pk>/', PerformanceModify.as_view(), name='공연 정보 수정'),
    path('category/', CategoryList.as_view(), name='카테고리 생성 및 보기'),
    path('category/<int:pk>/', CategoryDetail.as_view(), name='카테고리 detail'), 
    path('image/', ImageCreate.as_view(), name='이미지 생성'),
    path('image/<int:pk>/', ImageDetail.as_view(), name='이미지 상세 보기'),
    path('performance/category/<int:pk>/', PerformanceCategoryDetail.as_view(), name='카테고리별 공연보기'),
]
