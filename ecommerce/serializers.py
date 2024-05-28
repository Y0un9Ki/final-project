from rest_framework import serializers

from .models import Performance, Category, Image

# 여기서 공부해야 할 점 : 나는 performance모델의 여러 필드 중에서 몇개의 필드만을 가지고 오고 싶었다.
# 하지만 view에서 django의 ORM인 values()라는 메서드로 해결을 하려고 했지만 계속해서 실패했다.
# performance의 필드중에서 performance 모델이 자체적으로 갖는 필드는 예를 들어('id', 'name'... 등) values()로 선택적으로 가지고 올 수 있지만(blank=True로 되어있어야 될 거 같다.)
# foreignkey로 연결되어있는 것은 가지고 오지 못하는 문제가 발생했다. 계속해서 serializer에서 문제가 발생을 하였다.
# 그래서 이것을 해결하기 위해 고민 중에 serializer가 생각이 났고,
# 만약 내가 원하는 필드만을 가지고 와서 직렬화해서 view로 보내준다면 해결이 될 것같은 생각이 들었다.
# 그래서 아래와 같이 performance 모델의 여러가지의 serializer를 만들어주었고 필요로한 필드만 들고와서 직렬화 할 수 있게끔 만들어 주었다
# 결국에는 에러를 해결하게 되었다. 블로그에 정리하기!!!!
     
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        
class ImageSerializer(serializers.ModelSerializer):
    # performance = serializers.CharField(source='performance.name', read_only=True)
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
    # category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Performance
        fields = ['id', 'image', 'name', 'character', 'price', 'startdate', 'venue']       

class PerformanceSerializer(serializers.ModelSerializer):
    image = ImageSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Performance
        fields = '__all__'  
