from django.db import models
from django.contrib.auth.models import User

def __str__(self):
        return (self.surname + " " + self.name)

class Tag(models.Model):
    tag = models.CharField(max_length = 80, null=False, verbose_name="Тэг")
    class Meta:
        verbose_name = "Тэг"
        verbose_name_plural = "Тэги"

    def __str__(self):
        return self.tag

class New(models.Model):
    title = models.CharField(max_length = 80, null=False, verbose_name="Заголовок")
    text = models.TextField(null=False, verbose_name="Текст")
    date = models.DateField(null=False, verbose_name="Дата")
    author = models.ForeignKey(User, on_delete="SET_NULL", default=1)
    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

    def __str__(self):
        return self.title


