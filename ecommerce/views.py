from django.shortcuts import render
from django.utils import timezone
from django.db.models import F
from django.db import connection, connections
from django.http import JsonResponse
# 외부 라이브러리
from datetime import timedelta
from rest_framework import mixins, status, generics
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
# 앱 내 import
from .serializers import PerformanceSerializer, CategorySerializer, ImageSerializer, PerformanceDetailSerializer, PerformanceListSerializer
from .models import Performance, Category, Image
from .pagination import CustomPagination
# Create your views here.
class PerformanceRead(APIView):
    permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    
    def dictfetchall(cursor):
        "Return all rows from a cursor as a dict"
        columns = [col[0] for col in cursor.description]
        return [
            dict(zip(columns, row))
            for row in cursor.fetchall()
        ]
    
    def get(self, request, *args, **kwargs):
        def dictfetchall(cursor):
            "Return all rows from a cursor as a dict"
            columns = [col[0] for col in cursor.description]
            return [
                dict(zip(columns, row))
                for row in cursor.fetchall()
            ]
        
        with connections['default'].cursor() as cursor:
            cursor.execute('''
                SELECT p.id, p.name, c.name as category_name, p.subname, p.character, p.price, p.startdate, p.venue, p.create_date, p.update_date
                FROM ecommerce_performance p
                LEFT JOIN ecommerce_category c ON p.category_id = c.id
            ''')
            performances_data = dictfetchall(cursor)

        # performances = []
        # for performance_data in performances_data:
        #     category = Category(name=performance_data[2])  # 카테고리 인스턴스 생성
        #     performance = Performance(
        #         id=performance_data[0],
        #         name=performance_data[1],
        #         category=category,  # 카테고리 인스턴스 할당
        #         subname=performance_data[3],
        #         character=performance_data[4],
        #         price=performance_data[5],
        #         startdate=performance_data[6],
        #         venue=performance_data[7],
        #         create_date=performance_data[8],
        #         update_date=performance_data[9]
        #     )
        #     performances.append(performance)
        # print(performances_data)
        # serializer = PerformanceSerializer(performances, many=True)
        
        return JsonResponse({'performances': performances_data})
        # return Response(serializer.data)

class PerformanceList(mixins.ListModelMixin,
                      generics.GenericAPIView):
    serializer_class = PerformanceListSerializer
    queryset = Performance.objects.all()
    # 지금 위에 상황에서 사용되는 것이다. Performance.objects.values()로 선택적인 Performance의 필드를 가지고 오고 있다. 
    # 하지만 Performance 모델의 필드들은 모두 blank=True이기에 에러가 뜨지 않을 것이다. 밑에는 설명이다.
    # 여기서 null인자는 데이터 베이스에 null값으로 들어가도 되는지를 물어보는 것이며, blank는 해당 필드가 폼 입력 시 비어있어도 되는지에 대해서 물어보는 것이다.
    # 그렇기에 만약 Question이라는 모델 필드중에서 선택적으로 필드를 가지고 와야 할때에 응답을 줄 때에는 선택한 필드를 제외하고는 응답 폼에서 blank로 들어가게 된다.
    # 그렇기에 blank가 False로 지정 되어있다면 에러가 뜨게된다.
    # 만약 모델 중에 선택적으로 필드를 가지고 와야 하는 상황이 생긴다면 웬만하면 blank=True라는 인자를 잡아주자!!! 
    # 만약 데이터베이스 수준에서 해당 필드가 비어 있을 수 없도록 하고 싶다면 null=False로 설정해야 합니다. 이 설정은 데이터베이스에 해당 필드가 null이 아니어야 한다는 것을 의미합니다.
    # 따라서, 대부분의 필드에 대해 null=False와 함께 blank=True를 설정하여 데이터베이스 수준에서는 필수 필드이지만 폼 입력 시에는 비어 있어도 되는 유연한 모델을 만들어줄 수 있습니다.
    # 블로그 정리하기!!!
    permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    pagination_class = CustomPagination
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class PerformanceCreate(mixins.CreateModelMixin,
                        generics.GenericAPIView):
    serializer_class = PerformanceSerializer
    queryset = Performance.objects.all()
    permission_classes = [IsAdminUser]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    #authentication_classes = [JWTAuthentication]
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PerformanceCategoryDetail(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    #authentication_classes = [JWTAuthentication]
    
    def get_queryset(self, pk, format=None):
        try:
            category = Category.objects.get(pk=pk)
            performance = Performance.objects.filter(category=category)
            if performance.exists():
                return performance
            else:
                raise NotFound({'message': '찾으시는 공연이 없습니다.'})
        except category.DoesNotExist:
            raise NotFound({'message': '찾으시는 카테고리가 없습니다.'})
        
    def get(self, request, pk, format=None):
        perfomance = self.get_queryset(pk)
        serializer = PerformanceSerializer(perfomance, many=True)
        return Response(serializer.data)
        

class PerformanceDetail(mixins.RetrieveModelMixin,
                        generics.GenericAPIView):
    serializer_class = PerformanceDetailSerializer
    # queryset = Performance.objects.values('id', 'image', 'name', 'character', 'price', 'startdate', 'venue')
    queryset = Performance.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    #authentication_classes = [JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
class PerformanceModify(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        generics.GenericAPIView):
    serializer_class = PerformanceSerializer
    queryset = Performance.objects.all()
    permission_classes = [IsAdminUser]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    # authentication_classes = [JWTAuthentication]
    
    def get(self,request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class CategoryList(mixins.CreateModelMixin,
                   mixins.ListModelMixin,
                   generics.GenericAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAdminUser]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    # authentication_classes = [JWTAuthentication]
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class CategoryDetail(mixins.UpdateModelMixin,
                     mixins.DestroyModelMixin,
                     generics.GenericAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()
    permission_classes = [IsAdminUser]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    # authentication_classes = [JWTAuthentication]
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class ImageList(mixins.CreateModelMixin,
                mixins.ListModelMixin,
                generics.GenericAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    permission_classes = [IsAdminUser]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    # authentication_classes = [JWTAuthentication]
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class ImageDetail(mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  generics.GenericAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    permission_classes = [IsAdminUser]
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    # authentication_classes = [JWTAuthentication]
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)