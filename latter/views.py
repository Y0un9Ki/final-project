from django.shortcuts import render
# 외부 라이브러리
from rest_framework import mixins, status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
# 앱내에 import
from .models import Question, Answer
from .serializers import QuestionSerializer, AnswerSerializer
from .permission import IsOwnerOnly
from user.models import User
# Create your views here.

class QuestionList(mixins.ListModelMixin,
                   generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class QuestionCreate(mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    
class QuestionDetail(mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.RetrieveModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAdminUser,)
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    
        
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    
class AnswerCreate(mixins.CreateModelMixin,
                   generics.GenericAPIView):
    permission_classes=(IsAuthenticated,)
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class AnswerList(mixins.ListModelMixin,
                generics.GenericAPIView):
    permission_classes = (IsOwnerOnly,)
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
    
    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)

# class AnswerDetail(mixins.RetrieveModelMixin,
#                    mixins.UpdateModelMixin,
#                    mixins.DestroyModelMixin,
#                    generics.GenericAPIView):
#     permission_classes = (IsOwnerOnly,)
#     serializer_class = AnswerSerializer
#     queryset = Answer.objects.all()
    
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)

class AnswerOwnerList(APIView):
    def get_object(self, email):
        try:
            user = User.objects.get(email=email)
            return Answer.objects.filter(user = user)
        except User.DoesNotExist:
            raise status.HTTP_404_NOT_FOUND
        
    def get(self, request, email, format=None): # ==> get은 클라이언트로부터 온 요청이기에 email이 변수로 들어간 것은 우리가 urls.py에서 <str:email>로 설정해서 요청이 email로 들어오기 때문에 email이 되어야 한다.
                                                #     만약 urls.py에서 <int:pk>로 되어있었다면 get에는 pk의 변수가 들어가야 한다. (블로그에 작성하기!!!)
        answer = self.get_object(email)
        serializer = AnswerSerializer(answer, many=True)
        return Response(serializer.data)

class AnswerDetailQuestion(APIView):
    def get_object(self, pk, email):
        try:
            question = Question.objects.get(pk=pk)
            user = User.objects.get(email=email)
            return Answer.objects.get(question=question, user=user)
        except (User.DoesNotExist, Question.DoesNotExist, Answer.DoesNotExist):
            raise status.HTTP_404_NOT_FOUND
        
    def get(self, request, pk, email, format=None):
        answer=self.get_object(pk, email)
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)
            
class AnswerDetail(APIView):
    def get_object(self, email, pk):
        try:
            user = User.objects.get(email=email)
            return Answer.objects.get(user=user, id=pk)
        except (User.DoesNotExist, Answer.DoesNotExist):
            raise status.HTTP_404_NOT_FOUND
        
    def put(self, request, email, pk, format=None):
        answer = self.get_object(email, pk)
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        