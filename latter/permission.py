from rest_framework import permissions


class IsOwnerOnly(permissions.BasePermission):
    message = '수정 및 열람 권한이 없습니다'
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if request.method == 'GET' or request.method == 'PUT':
                return obj.user == request.user
        return False    

