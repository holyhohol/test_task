# Generated by Django 4.0.1 on 2022-02-02 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('social', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='like',
            name='created_at',
            field=models.DateField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='created_at',
            field=models.DateField(auto_now_add=True, verbose_name='Created at'),
        ),
    ]
