# Generated by Django 2.2.4 on 2019-08-20 12:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0013_auto_20190820_1226'),
    ]

    operations = [
        migrations.AlterField(
            model_name='new',
            name='author',
            field=models.ForeignKey(default=1, on_delete='SET_NULL', to='news.Authors'),
        ),
    ]
