from django.urls import path

from . import views
from .views import GetNews, GetOneNew, GetAuthor, Find, Total_news, Auth2, Adding_News, ExampleView 

urlpatterns = [
    path('news/', GetNews.as_view(), name='get_news'),
    path('news/<int:pk>', GetOneNew.as_view(), name='get_new'),
    path('author/<int:pk>', GetAuthor.as_view(), name='get_author'),
    path('news/search/', Find.as_view(), name='finding'),
    path('news/total/', Total_news.as_view(), name='total'),
    path('auth2', Auth2.as_view(), name='auth2'), 
    path('news/add', Adding_News.as_view(), name="adding_news"),
]

