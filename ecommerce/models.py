# django 라이브러리
from django.db import models
from django.utils import timezone
# 앱내의 import
from user.models import User

# Create your models here.
class Category(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=True)
    name = models.CharField(max_length=20, unique=True, null=True, blank=True)
    
    def __str__(self):
        return str(self.name)
    
class Performance(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=False)
    name = models.CharField(max_length=50, null=False, blank=False)
    subname = models.CharField(max_length=50, null=False, blank=False)
    category = models.ForeignKey(Category, related_name='performance', on_delete=models.CASCADE)
    character = models.TextField(null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    startdate = models.DateTimeField(null=False, blank=False)
    venue = models.TextField(null=False, blank=False)
    
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.name)
    
class Image(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=False)
    image = models.ImageField(upload_to='performance/', verbose_name='공연이미지', max_length=500, null=False, blank=False)
    performance = models.ForeignKey(Performance, related_name='image', on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.performance)
    
class Reservation(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=False)
    user = models.ForeignKey(User, related_name='reservation', on_delete=models.CASCADE)
    performance = models.ForeignKey(Performance, related_name='reservation', on_delete=models.CASCADE)