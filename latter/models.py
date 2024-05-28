# django
from django.db import models
from django.utils import timezone
# 앱 내에 import
from user.models import User

# Create your models here.

class Question(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=True)
    title = models.TextField(null=False, blank=True)
    content = models.TextField(null=False, blank=True) 
    # 여기서 null인자는 데이터 베이스에 null값으로 들어가도 되는지를 물어보는 것이며, blank는 해당 필드가 폼 입력 시 비어있어도 되는지에 대해서 물어보는 것이다.
    # 그렇기에 만약 Question이라는 모델 필드중에서 선택적으로 필드를 가지고 와야 할때에 응답을 줄 때에는 선택한 필드를 제외하고는 응답 폼에서 blank로 들어가게 된다.
    # 그렇기에 blank가 False로 지정 되어있다면 에러가 뜨게된다.
    # 만약 모델 중에 선택적으로 필드를 가지고 와야 하는 상황이 생긴다면 웬만하면 blank=True라는 인자를 잡아주자!!! 
    # 만약 데이터베이스 수준에서 해당 필드가 비어 있을 수 없도록 하고 싶다면 null=False로 설정해야 합니다. 이 설정은 데이터베이스에 해당 필드가 null이 아니어야 한다는 것을 의미합니다.
    # 따라서, 대부분의 필드에 대해 null=False와 함께 blank=True를 설정하여 데이터베이스 수준에서는 필수 필드이지만 폼 입력 시에는 비어 있어도 되는 유연한 모델을 만들어줄 수 있습니다.
    # 블로그 정리하기!!!
    
    create_date = models.DateTimeField(auto_now_add=True) # auto_now_add 옵션은 인스턴스가 생성이 될 때의 시간이 설정되며 처음 생성 된 후로는 변경되지 않는다.
    update_date = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.id) # 이것때문에 안되는 거였어 이거 무조건 블로그 써야되 영기야!!!!
    
class Answer(models.Model):
    id = models.AutoField(primary_key=True, unique=True, null=False, blank=True)
    user = models.ForeignKey(User, related_name='answer', on_delete=models.CASCADE, blank=True)
    question = models.ForeignKey(Question, related_name='answer', on_delete=models.CASCADE, blank=True)
    comment = models.TextField(null=True, blank=True)
    receive_point = models.BooleanField(default=False, blank=True)
    
    update_date = models.DateTimeField(auto_now=True) # auto_now 옵션은 인스턴스가 생성이 될 때 현재 시간이 설정되며 수정이 이루어지면 수정이 된 시간으로 값이 바뀐다.
    
    def __str__(self):
        return str(self.comment)