from django.urls import path
from . import views
from .views import GetNews, GetOneNew

urlpatterns = [
    path('', GetNews.as_view(), name='get_news'),
    path('/<int:pk>', GetOneNew.as_view(), name='get_news'),
    
]