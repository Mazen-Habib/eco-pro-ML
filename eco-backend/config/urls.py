"""
URL configuration for YOLO classifier project.
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('classifier.urls')),
]
