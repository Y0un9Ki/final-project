from rest_framework import serializers

from user.models import User
from .models import Answer, Question
from user.serializers import UserSerializer

class AnswerSerializer(serializers.ModelSerializer):
    user = serializers.EmailField(source='user.email', read_only=True)
    class Meta:
        model = Answer
        fields = ['id', 'question', 'user', 'comment', 'update_date']

class QuestionSerializer(serializers.ModelSerializer): 
    answer = AnswerSerializer(read_only=True) # ==> 여기서 answer에 여러 필드중에 특정 필드만을 가지고 오고 싶다면 위에 AnswerSerializer의 fields를 내가 원하는 필드만 넣어주어야 한다.
                                              #     django의 Serializer에서는 동작을 하지 않는듯 싶다.
    class Meta:
        model = Question
        fields = ['id', 'content', 'answer', 'update_date']


        





# class AnswerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Answer
#         fields = ['id', 'question_id', 'user_id', 'comment']

# class QuestionSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Question
#         fields = ['id', 'content', 'created_at', 'user_id']

# 망한 시도
# class AnswerSerializer(serializers.ModelSerializer):
#     # user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user.id')
#     # user_username = serializers.CharField(source='user.username', read_only=True)
#     # question_id = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all())
#     # #question_content = serializers.CharField(source='question.content', read_only=True)      
#     # question_content = serializers.SerializerMethodField()
    
#     # 시도
#     user = UserSerializer(many=True, read_only=True)
#     question = QuestionSerializer(many=True, read_only=True)
    
#     class Meta:
#         model = Answer
#         fields = ['id', 'user_id', 'user_username', 'question_id', 'question_content', 'comment', 'created_at']




# 밑에 부분 공부하기
# class AnswerSerializer(serializers.ModelSerializer):
#     user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user.id')
#     user_username = serializers.CharField(source='user.username', read_only=True) 
# # 여기서 source가 헷갈렸다. 나는 Answer 모델내에 foreign key로 field가 설정된 User모델에서 username을 가지고 오는 줄 알고 source='User.username'으로 작성을 했는데 에러가 떳다. 
# # 알고보니 Answer 모델에 foreign 키로 설정된 user라는 field에서 username을 가지고 오는 것이었다.
# # 여기서 user는 User를 foreign key로 갖는 Answer 모델에 field이다.
#     question_id = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all(), source='question.id')
# # 여기서도 마찬가지로 source는 Answer 모델에서 foreign 키로 설정된 question에서 id를 가지고 오는 것이다.
# # 여기서 question은 Question 모델을 foreign key로 가진다 라고 Answer 모델에 설정이 되어있다.
#     question_content = serializers.CharField(source='question.content', read_only=True)
    
#     class Meta:
#         model = Answer
#         fields = ['id','user_id','user_username', 'question_id', 'question_content', 'comment', 'created_at']


# source 부분 공부 좀 하자(foreign key와 ReadOnlyField 부분도 공부하기)
# class AnswerSerializer(serializers.ModelSerializer):
#     user = serializers.ReadOnlyField(source='user.username')  # Answer 모델의 user 필드의 username을 읽기 전용 필드로 추가
#     question_id = serializers.ReadOnlyField(source='question.id')  # Answer 모델의 question 필드의 id를 읽기 전용 필드로 추가
#     question_content = serializers.ReadOnlyField(source='question.content')  # Answer 모델의 question 필드의 content를 읽기 전용 필드로 추가
    
#     class Meta:
#         model = Answer
#         fields = ['id', 'user', 'question_id', 'question_content', 'comment', 'created_at']


