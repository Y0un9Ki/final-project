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
from .serializers import QuestionSerializer, AnswerSerializer, QuestionListSerializer, AnswerCommentSerializer
from .permission import IsOwnerOnly
from user.models import User
from .pagination import CustomPagination
# Create your views here.
# Question API part.

class QuestionList(mixins.ListModelMixin,
                   generics.GenericAPIView):
    # permission_classes = (AllowAny,)
    authentication_classes = [JWTAuthentication]
    pagination_class = CustomPagination
    # permission_classes = (IsAuthenticated,)
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    serializer_class = QuestionListSerializer
    queryset = Question.objects.all().order_by('create_date')
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class QuestionDetail(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAdminUser]
    
    def get_object(self, pk):
        try:
            question = Question.objects.get(pk=pk)
            return question
        except Question.DoesNotExist:
            raise NotFound({'message': '해당 질문이 존재 하지 않습니다.'})
        
    def put(self, request, pk, format=None):
        question = self.get_object(pk)
        serializer = QuestionSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionCreate(mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAdminUser,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class QuestionDetailModify(APIView):
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
        user = self.request.user
        serializer = QuestionSerializer(question)
        content = serializer.data['content']
        try:
            answer = Answer.objects.get(question=question, user=user)
            serializer_answer = AnswerSerializer(answer)
            user_id = serializer_answer.data['user']
            
            divided_contents = []
            if len(content) > 20:
                start = 0
                while start < len(content):
                    divided_contents.append(content[start:start+20])
                    start += 20
            else:
                divided_contents.append(content)

       
            comment = serializer_answer.data['comment']
            
            divided_comments = []
            if len(comment) > 20:
                start = 0
                while start < len(comment):
                    divided_comments.append(comment[start:start+20])
                    start += 20
            else:
                divided_comments.append(comment)
        
        
        
            response_data = {
                'user_id': user_id,
                'question_id': serializer.data['id'],
                'question_content': divided_contents,
                'question_answer': divided_comments,
            }
        
            return Response(response_data)
        except Answer.DoesNotExist:
            divided_comments = []
            divided_contents = []
            if len(content) > 20:
                start = 0
                while start < len(content):
                    divided_contents.append(content[start:start+20])
                    start += 20
            else:
                divided_contents.append(content)
            response_data = {
            'user_id': user.id,
            'question_id': serializer.data['id'],
            'question_content': divided_contents,
            'question_answer': divided_comments,
            }
            return Response(response_data)



# Answer API part.

# APIView로 짠 AnswerCreate
class AnswerCreate(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = [JWTAuthentication]
    #authentication_classes = [BasicAuthentication, SessionAuthentication]
    
    def post(self, request, format=None):
        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
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
                
            else:
                serializer.save(user=user)
                
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
# class AnswerCreate(mixins.CreateModelMixin,
#                    generics.GenericAPIView):
#     permission_classes=(IsAuthenticated,)
#     authentication_classes = [JWTAuthentication]
#     # authentication_classes = [BasicAuthentication, SessionAuthentication]
#     serializer_class = AnswerSerializer
#     queryset = Answer.objects.all()

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)
    
# # 그래서 답장을 작성한 후에 포인트를 받았다면 다시 포인트를 받기 위해서는 하루뒤에 작성을 해야만 포인트를 다시 받을 수 있게 로직을 짯다.
#     def perform_create(self, serializer):
#         user=self.request.user
#         print(user)
#         last_received_answer = Answer.objects.filter(user=user, receive_point=True).order_by('-update_date').first()
#         if last_received_answer is None or last_received_answer.update_date < timezone.now() - timedelta(days=1):
#             if user.point is None:
#                 user.point = 0
#             user.point += 500
#             user.save()
#             answer = serializer.save(user=user)
#             if answer.receive_point==False:
#                 answer.receive_point=True
#                 answer.save()
        
#         else:       
#             serializer.save(user=user)



# class AnswerDetailQuestion(APIView):
#     authentication_classes = [JWTAuthentication]
#     permission_classes = (IsAuthenticated,)
#     # authentication_classes = [BasicAuthentication, SessionAuthentication]
    
#     def get_object(self, pk):
#         try:
#             question = Question.objects.get(pk=pk)
#             user = self.request.user
#             answer = Answer.objects.get(question=question, user=user)
#             return answer
#         except Question.DoesNotExist:
#             raise NotFound({'message': '해당하는 데이터가 존재하지 않습니다.'})
#         except Answer.DoesNotExist:
#             return None
        
#     def get(self, request, pk, format=None):
#         answer=self.get_object(pk)
#         if answer is not None:
#             serializer = AnswerSerializer(answer)
#             comment = serializer.data['comment']
#             divided_comment = []

#             if len(comment) > 20:
#                 start = 0
#                 while start < len(comment):
#                     divided_comment.append(comment[start:start+20])
#                     start += 20
#             else:
#                 divided_comment.append(comment)
                
#             response_data = {
#                 'answer_id': serializer.data['id'],
#                 'user_id': serializer.data['user'],
#                 'question_id': serializer.data['question'],
#                 'answer_comment': divided_comment,
#                 'answer_date': serializer.data['update_date']
#             }
#             return Response(response_data)
#         else: # answer가 존재하지 않는 경우 없는 값으로 보내준다.
#             response_data = {
#                 'answer_id': None,
#                 'user_id': None,
#                 'question_id': None,
#                 'answer_comment': None,
#                 'answer_date': None
#             }
            
#             return Response(response_data)
    
#     def put(self, request, pk, format=None):
#         answer = self.get_object(pk)
#         serializer = AnswerSerializer(answer, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# 일단 임시방편!!!
class AnswerDetailQuestion(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    
    def get_object(self, pk):
        try:
            question = Question.objects.get(pk=pk)
            user = self.request.user
            answer = Answer.objects.filter(question=question, user=user).first()
            return answer
        except Question.DoesNotExist:
            raise NotFound({'message': '해당하는 데이터가 존재하지 않습니다.'})
        # except Answer.DoesNotExist:
        #     return None
        
    def get(self, request, pk, format=None):
        answer=self.get_object(pk)
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