from rest_framework import permissions

class IsOwnerOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            if obj.user == request.user:
                return True
            else:
                return False
        else:
            return False
