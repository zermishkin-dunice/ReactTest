from django.urls import path
from . import views
from .views import GetNews, GetOneNew, GetAuthor, Find

urlpatterns = [
    path('news/', GetNews.as_view(), name='get_news'),
    path('news/<int:pk>', GetOneNew.as_view(), name='get_new'),
    path('author/<int:pk>', GetAuthor.as_view(), name='get_author'),
    path('news/search/', Find.as_view(), name='finding'),
]