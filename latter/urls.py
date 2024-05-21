# django
from django.urls import path, include
# 외부라이브러리

# 앱내 import
from .views import QuestionList, QuestionDetail, AnswerCreate, QuestionCreate

urlpatterns = [
    path('question/', QuestionList.as_view(), name='질문지'),
    path('question/create/', QuestionCreate.as_view(), name='질문지 생성'),
    path('question/<int:pk>/', QuestionDetail.as_view(), name='질문지 업데이트'),
    path('answer/<int:pk>', AnswerCreate.as_view(), name='답글'),
]
