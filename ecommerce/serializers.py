from rest_framework import serializers

from .models import Performance, Category, Image, Reservation

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['image', 'performance']
                
class PerformanceListSerializer(serializers.ModelSerializer):
    image = ImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Performance
        fields = ['id', 'image', 'name', 'category', 'category_name', 'subname', 'price', 'create_date', 'startdate', 'venue']

class PerformanceDetailSerializer(serializers.ModelSerializer):
    image = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = Performance
        fields = ['id', 'image', 'name', 'character', 'price', 'startdate', 'venue']       

class PerformanceSerializer(serializers.ModelSerializer):
    image = ImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Performance
        fields = '__all__' 
        
class ReservationSerializer(serializers.ModelSerializer):
    performance_name = serializers.CharField(source='performance.name', read_only=True)
    performance_startdate = serializers.DateTimeField(source='performance.startdate', read_only=True)
    class Meta:
        model = Reservation
        fields = ['id', 'user', 'performance', 'performance_name', 'performance_startdate']
