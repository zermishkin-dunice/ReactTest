from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import New, Authors

class GetNews(TemplateView):
    def get(self, request):
         json_of_all_news = list(New.objects.all().values('title', 'text', 'date', 'author', 'id', ) ) 
         response = JsonResponse(json_of_all_news, safe=False)
         response['Access-Control-Allow-Origin'] = '*'
         return response

class GetOneNew(TemplateView):
    def get(self, request, pk):
        new = New.objects.get(pk=pk)
        json_of_new = model_to_dict(new)
        response = JsonResponse(json_of_new, safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        return response
class GetAuthor(TemplateView):
    def get(self, request, pk):
        author = Authors.objects.get(pk=pk)
        json_for_author = model_to_dict(author)
        response = JsonResponse(json_for_author, safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        return response

