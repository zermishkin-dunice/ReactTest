from django.views.generic import TemplateView
from django.http import HttpResponse
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from .models import New, Avatar
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
import datetime


class GetNews(TemplateView):
    def get(self, request):
        if (request.GET.get("page")):
            page = int(request.GET.get("page"))
        else:
            page = 1
        if (request.GET.get("newsonpage")):
            new_on_page = int(request.GET.get("newsonpage"))
        else:
            new_on_page = 3
        news = New.objects.all().order_by(
            '-date')[(int(page)*new_on_page-new_on_page):int(page)*new_on_page]
        lis = list(news.values('title', 'text',
                               'date', 'author', 'id', 'picture'))
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
            news = New.objects.filter(text__icontains=text)
        if (how == "title"):
            news = New.objects.filter(title__icontains=text)
        json_for_finding_news = list(news.values(
            'title', 'text', 'date', 'author', 'id', 'picture'))
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
            otvet = "error login. Time: " + str(datetime.datetime.now())
            response = HttpResponse(otvet)
            response['Access-Control-Allow-Origin'] = '*'
            return response

    def options(self, request):
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        return response


class Adding_News(TemplateView):
    def options(self, request):
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        response['Access-Control-Allow-Headers'] = 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
        return response

    def post(self, request):
        title = request.POST.get("title")
        text = request.POST.get("text")
        user = User.objects.get(pk=1)
        get_token = request.POST.get("token")
        token = Token.objects.get(key=get_token)
        user = User.objects.get(pk=token.user_id)
        picture = request.FILES['file']
        new = New.objects.create(
            title=title, text=text, date=datetime.datetime.now(), author=user, picture = picture)
        new.save()
        response = HttpResponse("Успешное сохранение")
        response['Access-Control-Allow-Origin'] = '*'
        return response


class Change_Ava(TemplateView):
    def options(self, request):
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        return response

    def post(self, request):
        get_token = request.POST.get("token")
        token = Token.objects.get(key=get_token)
        user = User.objects.get(pk=token.user_id)
        avatar = Avatar.objects.get(pk=user.id)
        avatar.avatar = request.FILES['file']
        avatar.save()
        data = {}
        data["avatar"] = str(avatar.avatar)
        response = JsonResponse(data)
        response['Access-Control-Allow-Origin'] = '*'
        return response


class ExampleView(APIView):
    def options(self, request):
        response = HttpResponse()
        response['Access-Control-Allow-Origin'] = '*'
        return response

    def post(self, request):
        title = request.POST.get("title")
        text = request.POST.get("text")
        author = request.user
        new = New.objects.create(
            title=title, text=text, date=datetime.datetime.now(), author=author)
        new.save()
        response = HttpResponse("Успешное сохранение")
        response['Access-Control-Allow-Origin'] = '*'
        return response


class AddAuthor(TemplateView):
    def post(self, request):
        username = request.POST.get("username")
        password = request.POST.get("password")
        email = request.POST.get("email")
        firstname = request.POST.get("firstname")
        lastname = request.POST.get("lastname")
        user = User.objects.filter(username=username).first()
        print("Пользователь", user)
        if user is None:
            new_user = User.objects.create_user(
                username=username,
                password=password,
                email=email,
                first_name=firstname,
                last_name=lastname,
            )
            new_user.save()
            Token.objects.get_or_create(user=new_user)
            Avatar.objects.get_or_create(user=new_user)
            response = HttpResponse("User {0} created successfully.".format(username))

        else:
            response = HttpResponse(
                "A user with username <{0}> already exists.".format(username))
        response['Access-Control-Allow-Origin'] = '*'
        return response
