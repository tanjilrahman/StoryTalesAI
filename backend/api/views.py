import os
import json
import requests
import cloudinary.uploader
from django.shortcuts import render
from django.contrib.auth.models import User
from django.conf import settings
from rest_framework import generics
from rest_framework.response import Response
from .serializers import UserSerializer, StorySerializer
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from .models import Story
import google.generativeai as genai


cloudinary.config( 
  cloud_name = os.getenv('CLOUDINARY_NAME'), 
  api_key = os.getenv('CLOUDINARY_API_KEY'), 
  api_secret = os.getenv('CLOUDINARY_API_SECRET') 
)

genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_title(req):
    language = req.data.get('lang')
    print(language)
    generated_title = generate_plot_with_gemini(language)

    return Response(generated_title)


class AllStoriesListView(generics.ListAPIView):
    serializer_class = StorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            queryset = Story.objects.order_by('-created_at')
        else: 
            queryset = Story.objects.filter(isPublic=True).order_by('-created_at')
            
        n = self.request.query_params.get('n')

        if n:
            try:
                n = int(n)
                queryset = queryset[:n]
            except ValueError:
                pass

        return queryset


class StoryRetrieveView(generics.RetrieveAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer
    permission_classes = [AllowAny]
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        data = serializer.data
        # Add the author's username to the response data
        data["author_username"] = instance.author.username
        data["author_first"] = instance.author.first_name
        data["author_last"] = instance.author.last_name

        return Response(data)


class StoryVisibility(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, pk):
        try:
            story = Story.objects.get(pk=pk)
        except Story.DoesNotExist:
            return Response({"error": "Story not found"})

        # Update the isPublic status
        new_status = request.data.get("isPublic")
        story.isPublic = new_status
        story.save()

        serializer = StorySerializer(story)
        return Response(serializer.data)
    

class StoryListCreate(generics.ListCreateAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Story.objects.filter(author=user).order_by('-created_at')
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            plot = serializer.validated_data.get('title')
            lang = serializer.validated_data.get('lang')
            print(lang)

            try:
                generated_content = generate_story_with_gemini(plot, lang)
                generated_content_parsed = json.loads(generated_content)
            except json.JSONDecodeError:
                print("JSON failed, regenerating...")
                # If json.loads fails, regenerate the story with Gemini
                generated_content = generate_story_with_gemini(plot, lang)
                generated_content_parsed = json.loads(generated_content)
            
            generated_images = generate_images(generated_content_parsed)
            serializer.save(author=self.request.user, content=generated_content, image=json.dumps(generated_images))
            return serializer.data['id']
        else:
            print(serializer.errors)

class StoryDelete(generics.DestroyAPIView):
    serializer_class = StorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if (self.request.user.is_superuser): 
            return Story.objects.filter()
        else:
            return Story.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# Plot generate
def generate_plot_with_gemini(lang):
    prompt = f"Generate a short story plot with interesting twists in {lang}. Genre: for kids, fun, scientific, educational. Length: 100 characters"

    # Set up the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
    safety_settings = [
  {
    "category": "HARM_CATEGORY_HARASSMENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_HATE_SPEECH",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
  {
    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
    "threshold": "BLOCK_MEDIUM_AND_ABOVE",
  },
]
    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash-latest",
        safety_settings=safety_settings,
        generation_config=generation_config,
    )
    response = model.generate_content(prompt)
    print(response.text)
    return response.text

# Gemini
def generate_story_with_gemini(plot, lang):
    prompt = f"{os.getenv('PROMPT')}".format(plot=plot)

    prompt_bangla = f"{os.getenv('PROMPT_BANGLA')}".format(plot=plot)

    # Set up the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "application/json",
    }
    safety_settings = [
        {
            "category": "HARM_CATEGORY_HARASSMENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_HATE_SPEECH",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
            "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
            "threshold": "BLOCK_MEDIUM_AND_ABOVE",
        },
        ]

    model = genai.GenerativeModel(
        model_name="gemini-1.5-flash-latest",
        safety_settings=safety_settings,
        generation_config=generation_config,
    )

    response = model.generate_content(prompt_bangla if lang == "bangla" else prompt)
    print(response.text)
    return response.text



# Initialize Image generation
def generate_images(prompt_content):
    generated_images = []

    image_prompt_1 = (
        f"{prompt_content['image_prompts'][0]}"
    )
    image_prompt_2 = (
        f"{prompt_content['image_prompts'][1]}"
    )
    image_prompt_3 = (
        f"{prompt_content['image_prompts'][2]}"
    )
    # image_prompt_4 = (
    #     f"{prompt_content['image_prompts'][3]}"
    # )

    generated_images.append(generate_image_with_stability(image_prompt_1))
    generated_images.append(generate_image_with_stability(image_prompt_2))
    generated_images.append(generate_image_with_stability(image_prompt_3))
    # generated_images.append(generate_image_with_stability(image_prompt_4))


    return generated_images


# Single Image generation
def generate_image_with_stability(prompt):
    engine_id = "stable-diffusion-xl-1024-v1-0"
    api_host = 'https://api.stability.ai'
    cloud_image_url = ""
    response_code = 0
    current_api = 0
    api_keys = [
        os.getenv("STABILITY_API_KEY_1"),os.getenv("STABILITY_API_KEY_2"),os.getenv("STABILITY_API_KEY_3"),os.getenv("STABILITY_API_KEY_4")
    ]

    while (response_code != 200):
        if (current_api == 4):
            break
        
        response = requests.post(
            f"{api_host}/v1/generation/{engine_id}/text-to-image",
            headers={
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": f"Bearer {api_keys[current_api]}"
            },
            json={
                "text_prompts": [
                    {
                        "text": prompt
                    }
                ],
                "cfg_scale": 30,
                "height": 1024,
                "width": 1024,
                "samples": 1,
                "steps": 30,
                "style_preset": "anime"
            },
        )

        if response.status_code != 200:
            if response.status_code == 429:
                print("Unauthorized (401). Trying again...")
                current_api = current_api + 1
                continue
            print("Non-200 response: " + str(response.text) + str(response.status_code))
        
        
        response_code = 200

        data = response.json()
        cloud_image_url = cloudinary.uploader.upload(f"data:image/png;base64,{data['artifacts'][0]['base64']}")

    return(cloud_image_url["secure_url"])


# ChatGPT
# def generate_story_with_chatgpt(plot):
#     chat_completion = client.chat.completions.create(
#         messages=[
#             {
#                 "role": "user",
#                 "content": f"{os.getenv('PROMPT_BANGLA')}".format(plot=plot)
#             }
#         ],
#         model="gpt-3.5-turbo",
#         max_tokens=1000,
#         response_format={
#             'type': 'json_object',
#         }
#     )

#     return chat_completion.choices[0].message.content


# Initialize Story Translation 
# def translate_story(content):
#     story_title = translate_text_with_chatgpt(content["title"])
#     story_para = []

#     for para in content["story"]:
#         story_para.append(translate_text_with_chatgpt(para))

#     story = {
#         "title": story_title,
#         "story": story_para
#     }

#     print(story)

#     return story


# Initialize Translation client with ChatGPT
# def translate_text_with_chatgpt(text):
#     chat_completion = client.chat.completions.create(
#         messages=[
#             {
#                 "role": "user",
#                 "content": f"Translate the following text in Bangladeshi Bangla language in a casual tone.\n text: {text}"
#             }
#         ],
#         model="gpt-4-turbo",
#         max_tokens=2000,
#     )
#     return chat_completion.choices[0].message.content


# Initialize Translation client
# def translate_text_with_google(
#     text, project_id: str = "storytalesai"
# ) -> translate.TranslationServiceClient:
#     client = translate.TranslationServiceClient()

#     location = "global"

#     parent = f"projects/{project_id}/locations/{location}"

#     response = client.translate_text(
#         request={
#             "parent": parent,
#             "contents": [text],
#             "mime_type": "text/plain",
#             "source_language_code": "en-US",
#             "target_language_code": "bn",
#         }
#     )

#     return response.translations[0].translated_text



# Single Image generation
# def generate_image_with_dalle(prompt):
#     response = client.images.generate(
#         model="dall-e-3",
#         prompt=prompt,
#         size="1024x1024",
#         quality="standard",
#         n=1,
#     )

#     image_url = response.data[0].url
#     cloud_image_url = cloudinary.uploader.upload(image_url)
#     return(cloud_image_url["secure_url"])