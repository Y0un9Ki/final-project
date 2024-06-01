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
from .serializers import PerformanceSerializer, CategorySerializer, ImageSerializer, PerformanceDetailSerializer, PerformanceListSerializer, ReservationSerializer
from .models import Performance, Category, Image, Reservation
from .pagination import CustomPagination
# Create your views here.

class PerformanceList(mixins.ListModelMixin,
                      generics.GenericAPIView):
    serializer_class = PerformanceListSerializer
    queryset = Performance.objects.all().order_by('startdate')
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    pagination_class = CustomPagination
    
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
# 메인페이지에 보면 공연리스트가 3개만 보여지는 부분이 있는데 그것에 해당하는 API를 만드는중
# 즉 공연리스트를 3개만 뽑아서 보내줘야 한다.
class PerformanceMainList(APIView):
    permission_classes = [AllowAny]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    # authentication_classes = [JWTAuthentication]
    
    def get(self, request, format=None):
        performance = Performance.objects.all().order_by('startdate')
        print(123, performance)
        serializer = PerformanceListSerializer(performance, many=True)
        # print(1111, serializer.data)
        
        print(len(serializer.data))
        if len(serializer.data)<=3:
            return Response(serializer.data)
        
        serializer_list = []
        for i in serializer.data:
            serializer_list.append(i)
            # print(serializer_list)
            if len(serializer_list)==3:
                return Response(serializer_list)
    
    
class PerformanceCreate(mixins.CreateModelMixin,
                        generics.GenericAPIView):
    serializer_class = PerformanceSerializer
    queryset = Performance.objects.all()
    permission_classes = [IsAdminUser]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class PerformanceCategoryDetail(APIView):
    permission_classes = [IsAuthenticated]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
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
        performance = self.get_queryset(pk)
        paginator = CustomPagination()
        result_page = paginator.paginate_queryset(performance, request)
        serializer = PerformanceSerializer(result_page, many=True)
        return paginator.get_paginated_response(serializer.data)
        

class PerformanceDetail(mixins.RetrieveModelMixin,
                        generics.GenericAPIView):
    serializer_class = PerformanceDetailSerializer
    queryset = Performance.objects.all()
    permission_classes = [IsAuthenticated]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
class PerformanceModify(mixins.RetrieveModelMixin,
                        mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        generics.GenericAPIView):
    serializer_class = PerformanceSerializer
    queryset = Performance.objects.all()
    permission_classes = [IsAdminUser]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
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
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
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
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
class ImageCreate(mixins.CreateModelMixin,
                mixins.ListModelMixin,
                generics.GenericAPIView):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
    permission_classes = [IsAdminUser]
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
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
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    authentication_classes = [JWTAuthentication]
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class ReservationCreate(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    
    def post(self, request, pk, format=None):
        try:
            performance = Performance.objects.get(pk=pk)
            user=self.request.user
            user_point = user.point
            if user.point is None:
                user.point = 0
                user.save()
            performance_price = performance.price
            serializer = ReservationSerializer(data=request.data)
            if serializer.is_valid():
                if user_point >= performance_price:
                    user.point = user_point - performance_price
                    user.save()
                    serializer.save(user=user, performance=performance)
                    
                    response_data = {
                        'user_id': serializer.data['user'],
                        'performance_id': serializer.data['performance'],
                        'performance_name': performance.name,
                        'message': '예약에 성공하셨습니다.'
                    }
                else:
                    point = performance_price - user_point
                    response_data = {
                        'user_id': user.id,
                        'message': f'{point}포인트가 부족해요ㅠㅠ'
                    }
                
                return Response(response_data, status=status.HTTP_200_OK)
            else:
                Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        except Performance.DoesNotExist:
            raise NotFound({'message':'해당 공연은 존재하지 않습니다.'})
            
class ReservationList(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)
    
    def get_queryset(self, format=None):
        user = self.request.user
        reservation = Reservation.objects.filter(user=user)
        if reservation.exists():
            return reservation
        else:
            response_data = {
                'reservation': []
            }
            return Response(response_data)
        
    
    def get(self, request, format=None):
        reservation = self.get_queryset()
        serializer = ReservationSerializer(reservation, many=True)
        return Response(serializer.data)