from django.shortcuts import render, get_object_or_404
from django.views.generic import TemplateView
from django.http import HttpResponse
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from .models import New, Avatar
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
import datetime


class GetNews(TemplateView):
    def get(self, request):
        if (request.GET.get("page")):
            page = int(request.GET.get("page"))
        else:
            page = 1
        if (request.GET.get("news_on_page")):
            new_on_page = int(request.GET.get("news_on_page"))
        else:
            new_on_page = 3
        news = New.objects.all().order_by(
            'date')[(int(page)*new_on_page-new_on_page):int(page)*new_on_page]
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
        avatar = Avatar.objects.get(pk=author)
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


class Auth2(TemplateView):
    def post(self, request):
        get_username = request.POST.get('username')
        get_password = request.POST.get('password')
        user = authenticate(username=get_username,
                            password=get_password)
        if user is not None:
            token = Token.objects.get(user=user)
            avatar = Avatar.objects.get(pk=user)
            data = model_to_dict(user)
            data["avatar"] = str(avatar.avatar)
            data["token"] = str(token)
            response = JsonResponse(data)
            response['Access-Control-Allow-Origin'] = '*'
            return response
        else:
            response = HttpResponse("Not success")
            response['Access-Control-Allow-Origin'] = '*'
            return response

    def options(self, request):
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        return response


class Adding_News(TemplateView):
    def options(self, request):
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        print(response)
        return response
    def post(self, request):
        print("Метод POST из Adding_News")
        title = request.POST.get("title")
        text = request.POST.get("text")
        user = User.objects.get(pk=1)
        get_token = request.POST.get("token")
        token = Token.objects.get(key = get_token)
        user = User.objects.get(pk=token.user_id)
        new = New.objects.create(title = title, text = text, date = datetime.datetime.now(), author = user)
        new.save()
        response = HttpResponse("Успешное сохранение")
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        return response

class ExampleView(APIView):
    # authentication_classes = [SessionAuthentication, BasicAuthentication, TokenAuthentication]
    # permission_classes = [IsAuthenticated]
    def options(self, request):
        print("Метод OPTIONS")
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        print(response)
        return response
    def post(self, request):
        print("Метод POST")
        title = request.POST.get("title")
        text = request.POST.get("text")
        author = request.user
        new = New.objects.create(title = title, text = text, date = datetime.datetime.now(), author = author)
        new.save()
        response = HttpResponse("Успешное сохранение")
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        
        return response