from django.urls import path
from . import views
from .views import GetNews, GetOneNew, GetAuthor

urlpatterns = [
    path('news/', GetNews.as_view(), name='get_news'),
    path('news/<int:pk>', GetOneNew.as_view(), name='get_new'),
    path('author/<int:pk>', GetAuthor.as_view(), name='get_author'),
]