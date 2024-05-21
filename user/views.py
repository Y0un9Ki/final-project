# 외부 라이브러리
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
# 앱내에 import
from .models import User
from .serializers import UserLoginSerializer, UserRegistrationSerializer
# Create your views here.


class UserRegistrationView(APIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)
    
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        
        if valid:
            serializer.save()
            
            response = {
                'message': '회원가입에 성공하였습니다'
            }
            return Response(response)
        
class UserLoginView(APIView):
    serializer_class = UserLoginSerializer
    permission_classes = (AllowAny,)
    
    def post(self, request):
        # 로그인 기능
        serializer = self.serializer_class(data=request.data)
        valid = serializer.is_valid(raise_exception=True)
        
        if valid:
            response_data = {
                'message' : '로그인에 성공하였습니다',
                'access' : serializer.data['access'],
                'refresh': serializer.data['refresh'],
                'authenticateUser': {
                    'id': serializer.data['id'],
                    'email': serializer.data['email'],
                    'username': serializer.data['username'],
                    'birthday': serializer.data['birthday'],
                    'location': serializer.data['location'],
                    'number': serializer.data['number'],
                    'point': serializer.data['point'],
                    'is_staff': serializer.data['is_staff'],
                    'is_superuser': serializer.data['is_superuser'],
                }
            }
            
            response = Response(response_data)
            refresh_token = serializer.data['refresh']
            access_token = serializer.data['access']
            
            # 쿠키에 저장을 하기 위해서는 Response라는 객체안에 담겨있을 때 set_cookie를 사용가능 하다. 
            # 그렇기에 response를 Response라는 객체에 담고 그 다음에 쿠키에 저장하는 방식으로 진행을 해야한다. 
            response.set_cookie('access', access_token, httponly=True)
            response.set_cookie('refresh', refresh_token, httponly=True)
            
            return response
        
        else:
            response = {
                'message': '로그인에 실패하였습니다'
            }
            return Response(response)
        
    def delete(self, request):
        # 로그아웃 기능
        # 쿠키에 저장된 토근 삭제 -> 로그아웃임.
        
        # 로그인 API에서 쿠키에 대한 저장, 삭제를 하기 위해선 Response라는 객체 안에 결과물이 담겨있어야 한다고 주석을 써놨다.
        # 요번에는 로그인 API와는 다르게 Response 객체 안에 결과물을 넣어서 작성을 하는 방식을 써봄.
        response = Response(
            {
            'message' : '로그아웃 되었습니다.'
        }
            )
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        
        return response