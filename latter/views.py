from django.shortcuts import render
from django.http import Http404
from django.contrib.auth import get_user_model
from django.utils import timezone
# 외부 라이브러리
from datetime import timedelta
from rest_framework import mixins, status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
# 앱내에 import
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer, QuestionListSerializer
from .permission import IsOwnerOnly
from user.models import User
from .pagination import CustomPagination
# Create your views here.
# Question API part.


# 우리의 latter기능 중에서 질문 ui를 보면 질문지 리스트에는 제목과 생성날짜만 보이게 된다.
# 그렇기에 질문지 리스트에 대한 get요청이 왔을시에 백앤드에서는 질문지의 제목과 생성일자만 API로 보내줘야 한다.
# 밑에 코드는 mixins를 이용해서 위에 요구를 만족한 코드이다.
# pagination_class를 mixins부터는 지원하기에 편하게 코드를 짤 수 있다.
class QuestionList(mixins.ListModelMixin,
                   generics.GenericAPIView):
    # permission_classes = (AllowAny,)
    authentication_classes = [JWTAuthentication]
    pagination_class = CustomPagination
    permission_classes = (IsAuthenticated,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    serializer_class = QuestionListSerializer
    queryset = Question.objects.all().order_by('create_date')
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

# 우리의 latter기능 중에서 질문 ui를 보면 질문지 리스트에는 제목과 생성날짜만 보이게 된다.
# 그렇기에 질문지 리스트에 대한 get요청이 왔을시에 백앤드에서는 질문지의 제목과 생성일자만 API로 보내줘야 한다.
# 밑에 코드가 해당되는 코드이다.
# APIView는 pagination_class를 지원하지 않기에 일일히 다 설정을 해주어야 한다.
# class QuestionListBack(APIView):
#     permission_classes = (AllowAny,)
#     # authentication_classes = [BasicAuthentication, SessionAuthentication]
#     authentication_classes = [JWTAuthentication]
    
#     def get(self, request, *args, **kwargs):
#         questions = Question.objects.values('title', 'create_date').order_by('create_date')
#         paginator = CustomPagination()
#         result_page = paginator.paginate_queryset(questions, request)
#         serializer = QuestionSerializer(result_page, many=True)
#         return paginator.get_paginated_response(serializer.data)
        # return Response(questions)

#-----------------------------------------------------------------------------------------------------       
# class QuestionListTest(APIView):
#     permission_classes = (AllowAny,)
#     authentication_classes = [JWTAuthentication]
    
#     def get(self, request, *args, **kwargs):
#         questions = Question.objects.values('content', 'update_date').order_by('update_date')
#         serializer = QuestionSerializer(questions, many=True)
#         return Response(serializer.data)

    # def get(self, request, *args, **kwargs):
    #     questions = Question.objects.values('content', 'update_date').order_by('update_date')
    #     return Response(questions)
    # 2개의 get함수에 정의를 잘 한번 보자.
    # 2개의 방법은 데이터를 처리하는 방법에서 차이가 존재한다. 
    # 첫번째 코드는 serializer로 데이터를 가공해서 응답을 주고
    # 두번째 코드는 serializer에 가공 없이 원본데이터로 응답을 준다의 차이인데 솔직히 잘 모르겠다.
#------------------------------------------------------------------------------------------------------

# class QuestionListSplit(APIView):
#     permission_classes = (AllowAny,)
#     authentication_classes = [JWTAuthentication]
    
#     def get(self, request, *args, **kwargs):
#         questions = Question.objects.values('id', 'content', 'update_date').order_by('update_date')
#         serializer = QuestionSerializer(questions, many=True)
#         divided_contents_list = []
#         for item in serializer.data:
#             divided_contents = []
#             content = item['content']
#             # print(content)
#             # print(len(content))
#             if len(content) > 20:
#                 start = 0
#                 while start < len(content):
#                     divided_contents.append(content[start:start+20])
#                     start +=20
#             else:
#                 divided_contents.append(content)
#             divided_contents_list.append({
#         'question_id': item['id'],  # 질문의 고유 식별자 등을 여기에 추가
#         'divided_contents': divided_contents,
#         'question_date': item['update_date']
#     })
#         return Response(divided_contents_list)

    
class QuestionCreate(mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAdminUser,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
class QuestionDetail(APIView):
    permission_classes = (AllowAny,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
    def get_object(self, pk):
        try:
            question = Question.objects.get(pk=pk)
            return question
        except Question.DoesNotExist: 
            raise NotFound({'message':'질문이 존재하지 않습니다.'})
        
    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question)
        
        content = serializer.data['content']
        divided_contents = []
        
        if len(content) > 20:
            start = 0
            while start < len(content):
                divided_contents.append(content[start:start+20])
                start += 20
        else:
            divided_contents.append(content)
        
        response_data = {
            'question_id': serializer.data['id'],
            'question_content': divided_contents,
            'question_date': serializer.data['update_date']
        }
        
        return Response(response_data)


# Answer API part.

# APIView로 짠 AnswerCreate
# class AnswerCreate(APIView):
#     permission_classes = (IsAuthenticated,)
#     authentication_classes = [BasicAuthentication, SessionAuthentication]
    
#     def post(self, request, format=None):
#         serializer = AnswerSerializer(data=request.data)
#         if serializer.is_valid():
#             user=self.request.user
#             last_received_answer = Answer.objects.filter(user=user, receive_point=True).order_by('-update_date').first()
#             if last_received_answer is None or last_received_answer.update_date < timezone.now() - timedelta(days=1):
#                 if user.point is None:
#                     user.point = 0
#                 user.point += 100
#                 user.save()
#                 answer = serializer.save(user=user)
#                 if answer.receive_point==False:
#                     answer.receive_point=True
#                     answer.save()
                
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
class AnswerCreate(mixins.CreateModelMixin,
                   generics.GenericAPIView):
    permission_classes=(IsAuthenticated,)
    authentication_classes = [JWTAuthentication]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
# 그래서 답장을 작성한 후에 포인트를 받았다면 다시 포인트를 받기 위해서는 하루뒤에 작성을 해야만 포인트를 다시 받을 수 있게 로직을 짯다.
    def perform_create(self, serializer):
        user=self.request.user
        last_received_answer = Answer.objects.filter(user=user, receive_point=True).order_by('-update_date').first()
        if last_received_answer is None or last_received_answer.update_date < timezone.now() - timedelta(days=1):
            if user.point is None:
                user.point = 0
            user.point += 100
            user.save()
            answer = serializer.save(user=user)
            if answer.receive_point==False:
                answer.receive_point=True
                answer.save()
                
        serializer.save(user=user)
        
        
class AnswerDetailQuestion(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    
    def get_object(self, pk):
        try:
            question = Question.objects.get(pk=pk)
            user = self.request.user  # 프론트에서 전달된 JWT 토큰을 사용하여 사용자를 식별하는 코드이다. 프론트엔드에서 JWT토큰을 header로 보내주면 서버에서 JWT토큰을 받아서 user를 식별한다.
            answer = Answer.objects.get(question=question, user=user)
            return answer
        except Question.DoesNotExist:
            raise NotFound({'message': '해당하는 데이터가 존재하지 않습니다.'})
        except Answer.DoesNotExist:
            return None
        
    def get(self, request, pk, format=None):
        answer=self.get_object(pk)
        # self.check_object_permissions(request, answer)
        if answer is not None:
            serializer = AnswerSerializer(answer)
            comment = serializer.data['comment']
            divided_comment = []

            if len(comment) > 20:
                start = 0
                while start < len(comment):
                    divided_comment.append(comment[start:start+20])
                    start += 20
            else:
                divided_comment.append(comment)
                
            response_data = {
                'answer_id': serializer.data['id'],
                'user_id': serializer.data['user'],
                'question_id': serializer.data['question'],
                'answer_comment': divided_comment,
                'answer_date': serializer.data['update_date']
            }
            return Response(response_data)
        else: # answer가 존재하지 않는 경우 없는 값으로 보내준다.
            response_data = {
                'answer_id': None,
                'user_id': None,
                'question_id': None,
                'answer_comment': None,
                'answer_date': None
            }
            
            return Response(response_data)
    
    def put(self, request, pk, format=None):
        answer = self.get_object(pk)
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 밑에 코드는 APIView를 이용해서 만든 코드
class AnswerList(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    
    def get_queryset(self):
        user = self.request.user
        answer = Answer.objects.filter(user=user)
        if answer.exists():
            return answer
        else:
            raise NotFound({'message': '해당하는 데이터가 존재하지 않습니다.'})
    
        
    def get(self, request, format=None):
        answer = self.get_queryset()
        serializer = AnswerSerializer(answer, many=True)
        return Response(serializer.data)

# 밑에 코드는 mixins를 이용해서 만든 코드 
# class AnswerList(mixins.ListModelMixin,
#                 generics.GenericAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = AnswerSerializer
    
#     def get_queryset(self):
#         user = self.request.user
#         answer = Answer.objects.filter(user=user)
#         if answer.exists():
#             return answer
#         else:
#             raise NotFound({'message': '해당하는 데이터가 존재하지 않습니다.'})
    
#     def get(self, request, *args, **kwargs):
#         return self.list(request,*args, **kwargs)
