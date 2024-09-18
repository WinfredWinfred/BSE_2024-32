from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class PasswordReset(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.IntegerField()
    link = models.CharField(max_length = 300, default="")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.user)
