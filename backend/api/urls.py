from django.urls import path
from . import views

urlpatterns = [
    path("story/", views.StoryListCreate.as_view(), name="story-list"),
    path("stories/delete/<int:pk>/", views.StoryDelete.as_view(), name="delete-story"),
    path("title/", views.generate_title, name="generate-title"),
    path('story/<int:pk>/', views.StoryRetrieveView.as_view(), name='story-detail'),
    path('all-stories/', views.AllStoriesListView.as_view(), name='all-stories')
]