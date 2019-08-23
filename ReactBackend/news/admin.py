from django.contrib import admin
from .models import New, Tag, Avatar


class NewAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'author')

class AvatarAdmin(admin.ModelAdmin):
    list_display = ('avatar', 'user')

admin.site.register(New, NewAdmin)
admin.site.register(Tag)
admin.site.register(Avatar)


