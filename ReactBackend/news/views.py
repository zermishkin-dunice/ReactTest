from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import New

class GetNews(TemplateView):
    def get(self, request):
         json_of_all_news = list(New.objects.all().values('title', 'text', 'date', 'author', 'id') ) 
         return JsonResponse(json_of_all_news, safe=False)

class GetOneNew(TemplateView):
    def get(self, request, pk):
        new = New.objects.get(pk=pk)
        json_of_new = model_to_dict(new)
        return JsonResponse(json_of_new, safe=False)



