# django
from django.db import models
from django.utils import timezone
# 앱 내에 import
from user.models import User

# Create your models here.

class Question(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    content = models.TextField(null=False, blank=False)
    update_date = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.id) # 이것때문에 안되는 거였어 이거 무조건 블로그 써야되 영기야!!!!
    
class Answer(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    user = models.ForeignKey(User, related_name='answer', on_delete=models.CASCADE)
    question = models.OneToOneField(Question, related_name='answer', on_delete=models.CASCADE)
    comment = models.TextField(null=True, blank=True)
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.comment)