from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from .models import New, Avatar



class GetNews(TemplateView):
    def get(self, request):
        page = request.GET.get("page")
        new_on_page = 3
        news = New.objects.all().order_by('date')[(int(page)*new_on_page-new_on_page):int(page)*new_on_page]
        lis = list(news.values('title', 'text', 'date', 'author', 'id', ))
        response = JsonResponse(lis, safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        response['Total-news'] = len(New.objects.all())
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
        author = User.objects.get(pk=pk)
        dic = model_to_dict(author)
        avatar = Avatar.objects.get(pk = author)
        dic["avatar"] = str(avatar.avatar)
        response = JsonResponse(dic, safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        return response


class Find(TemplateView):
    def get(self, request):
        how = request.GET.get("type")
        text = request.GET.get("word")
        if (how == "text"):
            news = New.objects.filter(text__contains=text)
        if (how == "title"):
            news = New.objects.filter(title__contains=text)
        json_for_finding_news = list(news.values(
            'title', 'text', 'date', 'author', 'id', ))
        response = JsonResponse(json_for_finding_news, safe=False)
        response['Access-Control-Allow-Origin'] = '*'
        return response

class Total_news(TemplateView):
    def get(self, request):
        count = len(New.objects.all())
        response = HttpResponse(count)  
        response['Access-Control-Allow-Origin'] = '*'
        return response