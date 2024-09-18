from rest_framework import serializers
from django.contrib.auth.models import User
from . models import *

class ToDoSerialiser(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = "__all__"