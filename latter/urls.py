# django
from django.urls import path, include
# 외부라이브러리

# 앱내 import
from .views import QuestionList, QuestionDetail, AnswerCreate, QuestionCreate, AnswerOwnerList, AnswerDetailQuestion, AnswerList

urlpatterns = [
    path('question/', QuestionList.as_view(), name='질문지'),
    path('question/create/', QuestionCreate.as_view(), name='질문지 생성'),
    path('question/<int:pk>/', QuestionDetail.as_view(), name='질문지 업데이트'),
    path('answer/create/', AnswerCreate.as_view(), name='답글생성'),
    path('answer/', AnswerList.as_view(), name = '답글보기'),
    path('answer/detail/<int:pk>/', AnswerDetailQuestion.as_view()),
    # path('answer/<str:email>/', AnswerOwnerList.as_view()),
    # path('main/', FirstView.as_view(), SecondView.as_view(), ThirdView.as_view()) 이런식으로 메인 페이지에 여러개의 view를 띄울 수 있다.
]
