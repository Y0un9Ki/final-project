from rest_framework import permissions

# 이 클래스는 각 객체에 대해 권한을 개별적으로 확인하는 것으로 단일 객체에 대해서만 적용된다.
# 우리가 has_object_permission을 사용했기에 단일 객체에 대해서 적용을 한다는 것.
# 만약 여기서 여러객체에 대해서 권한을 확인하려면 has_permission을 사용하고 for문을 통해서 loop를 돌려야 한다.
# 이것도 블로그 쓰기
class IsOwnerOnly(permissions.BasePermission):
    message = '수정 및 열람 권한이 없습니다'
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.method == 'GET' or request.method == 'PUT':
                return obj.user == request.user
        return False    

# 밑에가 이전에 짜놓은 클래스이다. 밑에것을 살펴보니 내가 실수 한게 로그인이 된 유저인지에 대한 검증이 없다.
# 그렇기에 이 권한을 사용하려면 permission_classes=(IsAuthenticated, IsOwnerOnly)처럼 IsAuthenticated와 같이 사용해야하는 문제가 발생
# 그렇기에 위에 IsAuthenticated을 IsOwnerOnly에 통합하는 방식으로 코드를 짯다.

# class IsOwnerOnly(permissions.BasePermission):
#     message = '수정 및 열람 권한이 없습니다'
#     def has_object_permission(self, request, view, obj):
#         if request.method in ["GET", "PUT"]:
#             return obj.user == request.user
#         return False
