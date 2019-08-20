from django.db import models

class Authors(models.Model):
    name = models.CharField(max_length = 80, null=False, verbose_name="Имя")
    surname = models.CharField(max_length = 80, null=False, verbose_name="Фамилия")
    avatar = models.CharField(max_length = 180, null=True, verbose_name="Аватарка")
    class Meta:
        verbose_name = "Автор"
        verbose_name_plural = "Авторы"

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
    author = models.ForeignKey(Authors, on_delete="SET_NULL")
    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"

    def __str__(self):
        return self.title


