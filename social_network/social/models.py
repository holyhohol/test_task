from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):

    title = models.CharField(max_length=255, verbose_name='Title')
    text = models.TextField(verbose_name='Post text')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Created at')
    user = models.ForeignKey(User, verbose_name='Created by', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name + ': ' + self.title
    