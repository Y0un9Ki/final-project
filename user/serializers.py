from .models import User
from rest_framework import serializers, exceptions
from django.contrib.auth.models import update_last_login
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegistrationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=100, required=True, write_only=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'username', 'location', 'birthday','number']
        
    def validate(self, attrs):
        email = User.objects.filter(email=attrs['email'])
        
        if email.exists():
            print(email.exists())
            raise serializers.ValidationError(
                {'message': '이미 존재하는 이메일 입니다'}
            )

        if attrs['password']!=attrs['password2']:
            raise serializers.ValidationError(
                {'message': '비밀번호가 일치하지 않습니다.'}
            )
            
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2','')
        user = User.objects.create(**validated_data)
        return user
    
class UserLoginSerializer(serializers.Serializer):
    id = serializers.UUIDField(read_only=True)
    email = serializers.EmailField()
    username = serializers.CharField(read_only=True)
    password = serializers.CharField(max_length=100, write_only=True)
    birthday = serializers.DateField(read_only=True)
    location = serializers.CharField(read_only=True)
    number = serializers.CharField(read_only=True)
    point = serializers.IntegerField(read_only=True)
    role = serializers.CharField(read_only=True)
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
            except User.DoesNotExist():
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
            'role' : user.role,
            'location' : user.location,
            'birthday' : user.birthday,
            'number' : user.number,
            'point' : user.point,
        }
        return validation
    
        
            