from django.db import models
from django.contrib.auth.models import User


class Post(models.Model):
    title = models.CharField(max_length=255, verbose_name='Title')
    text = models.TextField(verbose_name='Post text')
    created_at = models.DateTimeField(
        auto_now_add=True, verbose_name='Created at')
    author = models.ForeignKey(
        User, verbose_name='Created by', on_delete=models.CASCADE)

    def __str__(self):
        return self.author.first_name + ': ' + self.title


class Like(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    


