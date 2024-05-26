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
from .serializers import QuestionSerializer, AnswerSerializer
from .permission import IsOwnerOnly
from user.models import User
# Create your views here.

class QuestionList(mixins.ListModelMixin,
                   generics.GenericAPIView):
    permission_classes = (AllowAny,)
    authentication_classes = [JWTAuthentication]
    # permission_classes = (IsAuthenticated,)
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class QuestionCreate(mixins.CreateModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAdminUser,)
    authentication_classes = [JWTAuthentication]
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    
class QuestionDetail(mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     mixins.RetrieveModelMixin,
                     generics.GenericAPIView):
    permission_classes = (IsAdminUser,)
    authentication_classes=[JWTAuthentication]
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
    # permission_classes=(IsAuthenticated,)
    # authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    authentication_classes = [BasicAuthentication, SessionAuthentication]
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
        
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)
    #     # 사용자가 answer를 만들면은 사용자의 point가 자동으로 증가하는 로직을 구현한 것
    #     # 하지만 이것의 문제는 답장을 계속 만들면 무조건 포인트가 증가한다는 것이다.
    #     user = self.request.user
    #     if user.point is None:
    #         user.point=0
    #     user.point += 100
    #     user.save()
        
        
class AnswerDetailQuestion(APIView):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    
    def get_object(self, pk):
        try:
            question = Question.objects.get(pk=pk)
            user = self.request.user  # 프론트에서 전달된 JWT 토큰을 사용하여 사용자를 식별하는 코드이다. 프론트엔드에서 JWT토큰을 header로 보내주면 서버에서 JWT토큰을 받아서 user를 식별한다.
            answer = Answer.objects.get(question=question, user=user)
            return answer

        except (Question.DoesNotExist, Answer.DoesNotExist):
            raise NotFound({'message': '해당하는 데이터가 존재하지 않습니다.'})
        
    def get(self, request, pk, format=None):
        answer=self.get_object(pk)
        self.check_object_permissions(request, answer)
        
        serializer = AnswerSerializer(answer)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        answer = self.get_object(pk)
        serializer = AnswerSerializer(answer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# get_queryset()과 get_object()의 차이점 언제 사용하는지 어느 클래스 밑에 상속되어있는 메서드인지 공부해서 블로그 작성하자!!!

# 이것은 해당 유저의 answer을 모두 가지고 오는 API이다.
# 여기서 알게 된 점은 우리가 단일객체를 들고 올 때에는(self.object.get 즉, get으로 가지고 올 떄) get_object라는 함수를 이용해서 정의를 해줬는데
# AnswerList는 filter를 이용해서 해당되는 여러개의 객체들을 쿼리셋의 형태로 가지고 오게 된다.
# 그렇기에 쿼리셋으로 가지고 오게 될때에는 get_queryset을 정의해주어야 한다.
# 밑에 코드는 APIView를 이용해서 만든 코드
class AnswerList(APIView):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    
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


# # 필요없다.  
# class AnswerList(mixins.ListModelMixin,
#                 generics.GenericAPIView):
#     permission_classes = (IsAuthenticated,)
#     serializer_class = AnswerSerializer
#     queryset = Answer.objects.all()
    
#     def get(self, request, *args, **kwargs):
#         return self.list(request,*args, **kwargs)

# 필요없다.
class AnswerOwnerList(APIView):
    permission_classes = (IsOwnerOnly,)
    authentication_classes = [JWTAuthentication]
    def get_object(self, email):
        try:
            user = User.objects.get(email=email)
            return Answer.objects.filter(user = user)
        except User.DoesNotExist:
            raise NotFound({'message': '이 요청은 존재하지 않는 요청입니다.'}) # ==> 예외처리 시에는 꼭 DRF에서 지원하는 예외처리 클래스를 사용하자(PermissionDenied, NotFound, ValidationError 등)
        
    def get(self, request, email, format=None): # ==> get은 클라이언트로부터 온 요청이기에 email이 변수로 들어간 것은 우리가 urls.py에서 <str:email>로 설정해서 요청이 email로 들어오기 때문에 email이 되어야 한다.
                                                #     만약 urls.py에서 <int:pk>로 되어있었다면 get에는 pk의 변수가 들어가야 한다. (블로그에 작성하기!!!)
        answer = self.get_object(email)
        
        for answers in answer:
            self.check_object_permissions(request, answers)
        # 1. 위에 for구문의 2줄은 이걸 쓰지 않으면 내가 만들어 놓은 권한이 작동을 하지 않는다.
        # 1. 위에 for구문의 코드 2줄을 작성해야만이 내가 설정한 권한이 잘 작동을 한다.
        # --> 1.질문에 대한 답 : 우리는 AnswerOwnerList class에서 get_object 함수 안에 filter라는 ORM을 사용하여 단일 객체가 아닌 Answer 모델의 객체들의 쿼리셋을 즉, 여러 Answer의 객체를 들고왔다.
        #                    그렇기에 우리는 for문을 통해서 filter로 불러와진 Answer의 쿼리셋을 벗겨내주고 Answer의 모델 하나하나에 permission을 적용하기 위해서 for구문을 사용했다.
        #                    이 부분도 블로그 작성하자!!!!!
        # 2. 그리고 권한클래스에도 IsAuthenticated를 같이 써줘야 IsOwnerOnly가 작동을 한다 왜그런걸까?
        # --> 2.질문에 대한 답은 permission.py에 정리해놨다. 이거보고 블로그 작성하기
        serializer = AnswerSerializer(answer, many=True)
        return Response(serializer.data)
