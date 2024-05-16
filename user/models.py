import uuid
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser, PermissionsMixin
from django.utils.translation import gettext_lazy as _
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

from .validators import UnicodeUsernameValidator, UnicodeNumberValidator
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
    number_validator = UnicodeNumberValidator()

    
    id = models.UUIDField(primary_key=True, unique=True, editable=False, default=uuid.uuid4, verbose_name='Public identifier')
    email = models.EmailField(unique=True, error_messages={'unique': '이미 존재하는 이메일 입니다. 다른 이메일을 작성해주세요'}, blank=False, null=False)
    username = models.CharField(unique=False, null=False, max_length=20, validators=[username_validator])
    birthday = models.DateField(null=True)
    location = models.CharField(null=False, max_length=100, help_text={'message' : '사는 곳을 꼭 입력해주세요'})
    # numberRegex = RegexValidator(regex=r'^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$')
    number = models.CharField(validators=[number_validator], blank=False, null=False, max_length=20, help_text={'message' : '휴대전화 번호를 정확히 입력해주세요'})
    point = models.PositiveIntegerField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, blank=True, null=True, default=0)
    
    objects = UserManager()
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", 'location', 'birthday','number']
    
    # clean으로 오버라이딩을 해보려고 했지만 실패!!!
    # def clean(self):
    #     if User.objects.filter(email=self.email).exists():
    #         raise ValidationError({'message': '이미 존재하는 이메일 입니다.'})
    #     return super().clean()