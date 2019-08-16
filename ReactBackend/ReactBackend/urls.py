from django.contrib import admin
from django.urls import path
from django.conf.urls import include
from news import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('get/', include('news.urls')),   
]
