from rest_framework import serializers
from django.contrib.auth.models import User
from . models import *

class UserSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password']

class PasswordResetSerialiser(serializers.ModelSerializer):
    class Meta:
        model = PasswordReset
        fields = "__all__"