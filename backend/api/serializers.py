from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Story
import uuid

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class StorySerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(default=uuid.uuid4, read_only=True)
    class Meta:
        model = Story
        fields = ["id", "title", 'lang', "content", "image", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}, "content": {"read_only": True}, "image": {"read_only": True}}