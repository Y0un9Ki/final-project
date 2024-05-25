from django.shortcuts import render
from django.http import Http404
# 외부 라이브러리
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
    permission_classes=(IsAuthenticated,)
    authentication_classes = [JWTAuthentication]
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
class AnswerDetailQuestion(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
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
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    
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
class AnswerList(mixins.ListModelMixin,
                generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AnswerSerializer
    
    def get_queryset(self):
        user = self.request.user
        answer = Answer.objects.filter(user=user)
        if answer.exists():
            return answer
        else:
            raise NotFound({'message': '해당하는 데이터가 존재하지 않습니다.'})
    
    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)


# 필요없다.  
class AnswerList(mixins.ListModelMixin,
                generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = AnswerSerializer
    queryset = Answer.objects.all()
    
    def get(self, request, *args, **kwargs):
        return self.list(request,*args, **kwargs)

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



# 현재 짜놨지만 토큰을 사용하기 위해서 잠시 주석처리함 5/23일 21시 00분
# class AnswerDetailQuestion(APIView):
#     permission_classes = [IsAuthenticated]
#     authentication_classes = [JWTAuthentication]
    
#     def get_object(self, pk, email):
#         try:
#             question = Question.objects.get(pk=pk)
#             user = User.objects.get(email=email)
#             answer = Answer.objects.get(question=question, user=user)
            
#             # 아래의 코드는 permission_classes를 정의를 해주지 않아도 자체적으로 권한을 검증할 수 있는 코드다. 이것도 정리 해보자!!!
#             #---------------------------------------------------------------------------
#             # if answer and answer.user == self.request.user:
#             #     return answer
#             # else:
#             #     raise PermissionDenied({'message': '해당 답변에 대한 접근 권한이 없습니다.'})
#             #---------------------------------------------------------------------------
#             return answer
#         except (User.DoesNotExist, Question.DoesNotExist, Answer.DoesNotExist):
#             raise NotFound({'message': '이 요청은 존재하지 않는 요청입니다.'})

    # def get_object(self, pk, email):
    #     try:
    #         question = Question.objects.get(pk=pk)
    #         user = User.objects.get(email=email)
    #         return Answer.objects.get(question=question, user=user)
    #     except (User.DoesNotExist, Question.DoesNotExist, Answer.DoesNotExist):
    #         raise NotFound({'message': '이 요청은 존재하지 않는 요청입니다.'})
            # 원래는 raise status.HTTP_404_NOT_FOUND 이렇게 코드를 짯었는데 에러가 나왔다.
            # status.HTTP_404_NOT_FOUND는 DRF에서 제공하는 shortcut으로 HTTP 응답 상태 코드를 반환하는 역할을 한다.
            # 즉 이것은 HTTP 404상태 코드를 갖는 응답을 반환한다. 
            # 밑에와 같이 HTTP통신에서 쓰이는 GET, POST등과 같이 Response를 줄 때에는 status를 사용해도 되나,
            # 함수 안에서 예외처리를 해야 될 때에는 DRF에서 지원하는 예외클래스를 사용해서 예외처리를 진행해야 한다.
            # 그래서 위와 같이 DRF에서 지원하는 예외클래스를 사용했더니 에러가 뜨지 않았다. 이것도 정리하자
        
    # def get(self, request, pk, email, format=None):
    #     answer=self.get_object(pk, email)
        
    #     # 이 구문을 잘 생각해봐 영기야 지금 내가 permission_classes를 IsOwnerOnly라고 커스텀 해줬어 근데 커스텀한 permission을 사용하려면 
    #     # 꼭 밑에 코드와 같이 self.check_object_permissions(request, answer)구문이 들어가야 하는 거 같아.
    #     # permission_classes를 정의해도 참조를 못하는 거 같아. 그렇기에 밑에 구문을 써줘야되.
    #     # 만약 기본으로 내장된 permission_classes들에는(IsAdminUser, IsAuthenticated 등등) self.check_object_permissions(request, answer)이게 기본적으로 들어가는지 한번 보자!!
    #     # 만약 get_object에서 filter와 같이 여러 객체인 쿼리문이 오면 for문으로 다 벗겨서 하나하나 check해야 되고
    #     # 만약 get_object에서 get으로 단일 객체만 들고 온다면 밑에 구문만 쓰면 되!!!!
    #     # 이거 블로그에 작성하자! 꼭!!!!
    #     self.check_object_permissions(request, answer)
        
    #     serializer = AnswerSerializer(answer)
    #     return Response(serializer.data)
    
    # def put(self, request, pk, email, format=None):
    #     answer = self.get_object(pk, email)
    #     serializer = AnswerSerializer(answer, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
# class AnswerDetail(APIView):
#     # permission_classes 지정해주기 ==> mixins 방식이랑 똑같이 지정해주면 된다.
#     def get_object(self, email, pk):
#         try:
#             user = User.objects.get(email=email)
#             question = Question.objects.get(pk=pk)
#             return Answer.objects.get(user=user, question=question)
#         except (User.DoesNotExist, Question.DoesNotExist, Answer.DoesNotExist):
#             raise status.HTTP_404_NOT_FOUND
        
#     def put(self, request, email, pk, format=None):
#         answer = self.get_object(email, pk)
#         serializer = AnswerSerializer(answer, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        