# django 라이브러리
from django.db import models
from django.utils import timezone

# Create your models here.
class Category(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=True)
    name = models.CharField(max_length=20, unique=True, null=True, blank=True)
    
    def __str__(self):
        return str(self.id)
    
class Performance(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=True)
    name = models.CharField(max_length=50, null=False, blank=True)
    subname = models.CharField(max_length=50, null=False, blank=True)
    category = models.ForeignKey(Category, related_name='performance', on_delete=models.CASCADE, null=False, blank=True)
    character = models.TextField(null=False, blank=True)
    price = models.IntegerField(null=False, blank=True)
    startdate = models.DateTimeField(null=False, blank=True)
    venue = models.TextField(null=False, blank=True)
    
    create_date = models.DateTimeField(auto_now_add=True)
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.name)
    
class Image(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=True)
    image = models.ImageField(upload_to='performance/', verbose_name='공연이미지', max_length=500, null=True, blank=True)
    performance = models.ForeignKey(Performance, related_name='image', on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.performance)
    
    
