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
        print(serializer.data)
        
        content = serializer.data['content']
        print(content)
        user = self.request.user
        print(user.id)
        divided_contents = []
        
        if len(content) > 20:
            start = 0
            while start < len(content):
                divided_contents.append(content[start:start+20])
                start += 20
        else:
            divided_contents.append(content)
        
        if len(serializer.data['answer'])==0:
            divided_comments = []
            response_data = {
            'user_id': user.id,
            'question_id': serializer.data['id'],
            'question_content': divided_contents,
            'question_answer': divided_comments,
        }
            return Response(response_data)
        else:
        
            comment = serializer.data['answer'][0]['comment']
            print(comment)
            divided_comments = []
            

            if len(comment) > 20:
                start = 0
                while start < len(comment):
                    divided_comments.append(comment[start:start+20])
                    start += 20
            else:
                divided_comments.append(comment)
        
        
        
        response_data = {
            'user_id': user.id,
            'question_id': serializer.data['id'],
            'question_content': divided_contents,
            'question_answer': divided_comments,
        }
        
        return Response(response_data)

# 이부분 꼭 블로그 써라 영기야!!!!! 제일 중요!!! 
# 이부분이 무엇이냐면 위에 코드를 수정한 것.
# 위에 코드의 문제점이 무엇이냐면 user=self.request.user로 잡았다 한들 question에는 user를 볼 수 있는 외래키가 없기에 question의 id가 1인 question에 answer가 생긴다면 
# 어떤 유저가 요청을 하든 모든 유저에게 question id가 1에 해당하는 다른 유저가 작성한 answer이 보였다. 
# 즉 우리는 요청을 한 사용자랑 question id가 1인 question에 answer를 작성한 사용자가 같은 answer만을 보여줘야 하는데
# 요청을 한 사용자랑 question id가 1인 question에 answer를 작성한 사용자가 다름에도 불구하고 다른 사용자의 질문이 보여지는 이슈가 발생
# 그래서 아래와 같은 코드로 요청을 한 사용자가 만약 특정 question에 질문을 달았을 때 요청을 한 사용자의 질문의 답장을 보여주게 만들었고 
# 그리고 만약 특정 질문에 답장이 없다면 빈 배열값으로 답장을 주는 문제를 해결했따.
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
            print(serializer_answer.data['user'])
            user_id = serializer_answer.data['user']
            
            # user = self.request.user
            # print(user.id)
            divided_contents = []
            if len(content) > 20:
                start = 0
                while start < len(content):
                    divided_contents.append(content[start:start+20])
                    start += 20
            else:
                divided_contents.append(content)
        
        
        
            comment = serializer_answer.data['comment']
            print(comment)
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
        print(user)
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