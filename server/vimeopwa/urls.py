"""vimeopwa URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from api.views import Download_file, Get_playlist, Get_video_cdn_path, Download_video, Get_download_progress

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/download_file', Download_file.as_view()),
    path('api/get_playlist', Get_playlist.as_view()),
    path('api/get_video_cdn_path', Get_video_cdn_path.as_view()),
    path('api/download_video', Download_video.as_view()),
    path('api/get_download_progress', Get_download_progress.as_view()),
    path('api/download_video', Download_video.as_view()),
]
