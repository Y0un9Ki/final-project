# django
from django.db import models
from django.utils import timezone
# 앱 내에 import

# Create your models here.

class Question(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.question)
    
class Answer(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    question_id = models.ForeignKey(Question, related_name='answer', on_delete=models.CASCADE)
    comment = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.answer)