# django
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
# 외부 라이브러리
from rest_framework import serializers, exceptions
from rest_framework_simplejwt.tokens import RefreshToken
# 앱 내에 import
from .models import User
from ecommerce.serializers import ReservationSerializer

class UserSerializer(serializers.ModelSerializer):
    reservation = ReservationSerializer(many=True) # 이때 reservation라는 변수명은 Reservation 모델에서 만들어 놓은 related_name을 따라야 한다.
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'birthday', 'location', 'number', 'point', 'reservation']
        
class UserModifySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'birthday', 'location', 'number']


class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=100, required=True, write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'username', 'location', 'birthday','number']
        
    def validate(self, attrs):

        if attrs['password']!=attrs['password2']:
            raise serializers.ValidationError(
                {'message': '비밀번호가 일치하지 않습니다.'}
            )
            
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2','')
        user = User.objects.create_user(**validated_data) #usermanager에 create_user라는 함수를 만들어 놨다!!!
        return user
    
class UserLoginSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    email = serializers.EmailField()
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(write_only=True)
    birthday = serializers.DateField(read_only=True)
    location = serializers.CharField(read_only=True)
    number = serializers.CharField(read_only=True)
    point = serializers.IntegerField(read_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    is_superuser = serializers.BooleanField(read_only=True)
    access = serializers.CharField(read_only=True)
    refresh = serializers.CharField(read_only=True)
    
    def validate(self, attrs):
        email = attrs['email']
        password = attrs['password']
        user = authenticate(email=email, password=password)
        
        if user is None:
            try:
                User.objects.get(email=email)
                raise serializers.ValidationError(
                    {'message': '비밀번호를 확인해 주세요'}
                    )
            except User.DoesNotExist:
                raise serializers.ValidationError(
                    {'message': '회원가입을 해주세요'}
                    )
                
        refresh = RefreshToken.for_user(user)
        refresh_token = str(refresh)
        access_token = str(refresh.access_token)
        
        update_last_login(None, user)
        
        validation = {
            'access' : access_token,
            'refresh' : refresh_token,
            'id' : user.id,
            'email' : user.email,
            'username' : user.username,
            'location' : user.location,
            'birthday' : user.birthday,
            'number' : user.number,
            'point' : user.point,
            'is_staff' : user.is_staff,
            'is_superuser' : user.is_superuser,
        }
        return validation
    
        
            