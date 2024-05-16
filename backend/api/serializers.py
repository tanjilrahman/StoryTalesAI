from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Story
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import uuid

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "first_name", "last_name"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ["id", "title", 'lang', "content", "image", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}, "content": {"read_only": True}, "image": {"read_only": True}}


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user

        data['username'] = user.username
        data['email'] = user.email
        return data