from django.db import models
from django.contrib.auth.models import User

class Story(models.Model):
    title = models.CharField()
    isPublic = models.BooleanField(default=True)
    lang = models.CharField(default="english")
    image = models.TextField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="stories")

    def __str__(self):
        return self.title
