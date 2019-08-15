from django.contrib import admin
from .models import New, Authors, Tag

class NewAdmin(admin.ModelAdmin):
    list_display = ('title', 'date',)

class AuthorsAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname')

admin.site.register(New, NewAdmin)
admin.site.register(Authors, AuthorsAdmin)
admin.site.register(Tag)


