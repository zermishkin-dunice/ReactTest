from django.contrib import admin
from .models import New, Tag

class NewAdmin(admin.ModelAdmin):
    list_display = ('title', 'date',)



admin.site.register(New, NewAdmin)
admin.site.register(Tag)


