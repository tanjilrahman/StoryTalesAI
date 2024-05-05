from django.shortcuts import render
from django.contrib.auth.models import User
from openai import OpenAI
from rest_framework import generics
from .serializers import UserSerializer, StorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Story
import cloudinary.uploader
import os
import translators as ts

cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET') 
)

class StoryListCreate(generics.ListCreateAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Story.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            title = serializer.validated_data.get('title')

            client = OpenAI(
                api_key=os.getenv('OPENAI_API_KEY'),
            )

            chat_completion = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": f"Based on the following title create a cute little story for a 5 year old:\n\n{title}\n\nStory:",
                    }
                ],
                model="gpt-3.5-turbo",
                max_tokens=600,
            )

            generated_content = chat_completion.choices[0].message.content

            generated_content_translated=ts.translate_text(generated_content, translator="google", from_language="auto", to_language="bn")

            image_prompt = (
                f"Subject: {title}, {generated_content[:800]}"  # use the space at end
                "Style: pixar animated movie style, dramatic lighting."     # this is implicit line continuation
            )

            response = client.images.generate(
                model="dall-e-2",
                prompt=image_prompt,
                size="256x256",
                quality="standard",
                n=1,
            )

            image_url = response.data[0].url
            uploaded_image_url = cloudinary.uploader.upload(image_url)
            print(uploaded_image_url["secure_url"])

            serializer.save(author=self.request.user, content=generated_content_translated, image=uploaded_image_url["secure_url"])
        else:
            print(serializer.errors)


class StoryDelete(generics.DestroyAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Story.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]