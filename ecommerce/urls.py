# django
from django.urls import path
# 앱 내 import 
from .views import PerformanceList, PerformanceCreate, PerformanceDetail, PerformanceModify, CategoryList, CategoryDetail, ImageList, ImageDetail


urlpatterns = [
    path('performance/create/', PerformanceCreate.as_view()),
    path('performance/', PerformanceList.as_view()),
    path('performance/detail/<int:pk>', PerformanceDetail.as_view()),
    path('performance/modify/<int:pk>', PerformanceModify.as_view()),
    path('category/', CategoryList.as_view()),
    path('category/<int:pk>', CategoryDetail.as_view()),
    path('image/', ImageList.as_view()),
    path('image/<int:pk>', ImageDetail.as_view()),
]
