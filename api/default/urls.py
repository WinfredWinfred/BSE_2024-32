from django.urls import path
from . import views

urlpatterns = [
    path('', views.homeView, name='homeView'),
    path('todo', views.toDoView, name='toDoView'),
    path('todo/<int:id>', views.toDoDetailsView, name='toDoDetailsView'),
]