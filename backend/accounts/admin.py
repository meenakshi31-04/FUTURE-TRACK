from django.contrib import admin
from .models import Profile

admin.site.register(Profile)
from .models import Course, Enrollment

admin.site.register(Course)
admin.site.register(Enrollment)
