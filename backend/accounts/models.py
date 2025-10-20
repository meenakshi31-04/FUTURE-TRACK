from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=30, blank=True)
    education = models.CharField(max_length=50, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    time_spent_today = models.IntegerField(default=0, help_text='Minutes spent today')
    goal = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"Profile: {self.user.email}"


class Course(models.Model):
    title = models.CharField(max_length=200)
    provider = models.CharField(max_length=200, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_on = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default='enrolled')
    progress = models.IntegerField(default=0, help_text='Progress percent')

    def __str__(self):
        return f"{self.user.email} -> {self.course.title}"
