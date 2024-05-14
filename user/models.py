import uuid
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
from django.core.validators import RegexValidator

from .validators import UnicodeUsernameValidator
from .manager import UserManager

# Create your models here.
class User(AbstractBaseUser, PermissionsMixin):
    
    COMMON_USER = 0
    STAFF = 1
    ADMIN = 2
    
    ROLE_CHOICES = (
        (ADMIN, 'Admin'),
        (STAFF, 'Staff'),
        (COMMON_USER, 'common_user')
    )
    
    username_validator = UnicodeUsernameValidator()
    
    uid = models.UUIDField(primary_key=True, unique=True, editable=False, default=uuid.uuid4, verbose_name='Public identifier')
    email = models.EmailField(unique=True, blank=False, null=False, error_messages={
        'message' : _('이미 email이 존재합니다')
    },)
    username = models.CharField(unique=False, null=False, max_length=20, validators=[UnicodeUsernameValidator], error_messages={'message': '한글로만 입력해주세요'})
    birthday = models.DateField(null=True)
    location = models.CharField(null=False, max_length=100, help_text={'message' : '사는 곳을 꼭 입력해주세요'})
    numberRegex = RegexValidator(regex=r'^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$')
    number = models.CharField(validators=[numberRegex], blank=False, null=False, max_length=20, help_text={'message' : '휴대전화 번호를 정확히 입력해주세요'}, error_messages={'message': '정확한 휴대전화 번호를 입력해주세요'})
    point = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    Role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=0)
    
    objects = UserManager()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", 'location', 'birthday','number']
    