# django
from django.db import models
from django.utils import timezone
# 앱 내에 import
from user.models import User

# Create your models here.

class Question(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=False)
    title = models.TextField(null=False, blank=False)
    content = models.TextField(null=False, blank=False)     
    create_date = models.DateTimeField(auto_now_add=True) # auto_now_add 옵션은 인스턴스가 생성이 될 때의 시간이 설정되며 처음 생성 된 후로는 변경되지 않는다.
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.id)
    
class Answer(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=False)
    user = models.ForeignKey(User, related_name='answer', on_delete=models.CASCADE, blank=False)
    question = models.ForeignKey(Question, related_name='answer', on_delete=models.CASCADE, blank=False)
    comment = models.TextField(null=True, blank=False)
    receive_point = models.BooleanField(default=False, blank=False)
    
    update_date = models.DateTimeField(auto_now=True) # auto_now 옵션은 인스턴스가 생성이 될 때 현재 시간이 설정되며 수정이 이루어지면 수정이 된 시간으로 값이 바뀐다.
    
    def __str__(self):
        return str(self.comment)