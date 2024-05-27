# django 라이브러리
from django.db import models
from django.utils import timezone

# Create your models here.
class Category(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    name = models.CharField(max_length=20, unique=True, null=True)
    
    def __str__(self):
        return str(self.name)
    
class Performance(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False)
    image = models.ImageField(upload_to='media/performance/', verbose_name='공연이미지', max_length=500, null=True, blank=True)
    name = models.CharField(max_length=50, null=False)
    subname = models.CharField(max_length=50, null=False)
    category = models.OneToOneField(Category, related_name='performance', on_delete=models.CASCADE)
    character = models.TextField(null=False, blank=False)
    price = models.IntegerField(null=False, blank=False)
    startdate = models.DateTimeField(null=False, blank=False)
    venue = models.TextField(null=False, blank=False)
    
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.name)
    
    
