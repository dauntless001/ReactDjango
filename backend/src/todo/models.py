from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class User(AbstractUser):
    pass

class Todo(models.Model):
    task = models.CharField(max_length=30, unique=True)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.task