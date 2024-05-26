# django import
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
# 외부 라이브러리
import uuid
# 앱내에 import
from .validators import UnicodeUsernameValidator, UnicodeNumberValidator
from .manager import UserManager

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    
    username_validator = UnicodeUsernameValidator()
    number_validator = UnicodeNumberValidator()

    
    id = models.UUIDField(primary_key=True, unique=True, editable=False, default=uuid.uuid4, verbose_name='Public identifier')
    email = models.EmailField(unique=True, error_messages={'unique': '이미 존재하는 이메일 입니다. 다른 이메일을 작성해주세요'}, blank=False, null=False)
    username = models.CharField(unique=False, null=False, max_length=20, validators=[username_validator])
    birthday = models.DateField(null=True)
    location = models.CharField(null=False, max_length=100, help_text={'message' : '사는 곳을 꼭 입력해주세요'})
    number = models.CharField(validators=[number_validator], blank=False, null=False, max_length=20, help_text={'message' : '휴대전화 번호를 정확히 입력해주세요'})
    point = models.PositiveIntegerField(null=True, blank=True, default=0)
    # create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    objects = UserManager()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", 'location', 'birthday','number']
    
    def __str__(self):
        return str(self.email)