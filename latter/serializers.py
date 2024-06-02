from rest_framework import serializers

from user.models import User
from .models import Answer, Question
from user.serializers import UserSerializer

class AnswerSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    question_content = serializers.CharField(source='question.content', read_only=True)
    class Meta:
        model = Answer
        fields = ['id', 'question', 'question_content', 'user', 'user_email', 'comment',  'update_date']

class AnswerCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['comment']

class QuestionSerializer(serializers.ModelSerializer): 
    answer = AnswerCommentSerializer(many=True, read_only=True)
    class Meta:
        model = Question
        fields = ['id', 'title', 'content', 'answer']
        
class QuestionListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'title', 'create_date']