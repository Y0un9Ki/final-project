from rest_framework import serializers

from .models import Performance, Category

     
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        

class PerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Performance
        fields = ['id', 'image', 'name', 'subname', 'category', 'character', 'price', 'startdate', 'venue']