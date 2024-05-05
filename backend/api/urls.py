from django.urls import path
from . import views

urlpatterns = [
    path("story/", views.StoryListCreate.as_view(), name="story-list"),
    path("stories/delete/<int:pk>/", views.StoryDelete.as_view(), name="delete-story")
]