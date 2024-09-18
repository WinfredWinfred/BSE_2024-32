from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . serilaisers import *
from django.contrib.auth.models import User
from . models import *
from django.db.models import Q

# Create your views here.
@api_view(['GET'])
def homeView(request):
    message = {
        "message":"welcome to our API endpoints"
    }
    return Response(message, status=status.HTTP_200_OK) 

@api_view(['GET', 'POST'])
def toDoView(request):
    if request.method == 'GET':
        search = request.GET.get('search')
        all_todo = ToDo.objects.all()
        if search:
            all_todo = all_todo.filter(
                Q(name__icontains = search) |
                Q(description__icontains = search))
        serialiser = ToDoSerialiser(all_todo, many = True)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    else:
        data = request.data
        serialiser = ToDoSerialiser(data = data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def toDoDetailsView(request, **kwargs):
    try:
        toDo = ToDo.objects.get(pk = kwargs['id'])
    except ToDo.DoesNotExist as e:
        return Response({"details":f"{e}"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serialiser = ToDoSerialiser(toDo)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        data = request.data
        serialiser = ToDoSerialiser(toDo, data=data, partial = True)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_202_ACCEPTED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        todo = toDo.name
        msg = f"todo {todo} deleted successfully!"
        toDo.delete()
        return Response({"message":msg}, status=status.HTTP_404_NOT_FOUND)