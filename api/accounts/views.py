from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from . models import *
from . serialisers import *
from django.db.models import Q
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import random
import uuid
from django.core.mail import EmailMessage

# Create your views here.
@api_view(['GET'])
def homeView(request):
    message = {
        "message":"Accounts API endpoints"
    }
    return Response(message, status=status.HTTP_200_OK)

@api_view(['POST'])
def loginView(request):
    data = request.data
    serialiser = AuthTokenSerializer(data = data)
    if serialiser.is_valid():
        user = serialiser.validated_data['user']
        token, created = Token.objects.get_or_create(user = user)
        data = {
            "id":user.id,
            'token':token.key
        }
        return Response(data, status=status.HTTP_200_OK)
    return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logoutView(request):
    try:
        token = Token.objects.get(user = request.user)
        token.delete()
    except Token.DoesNotExist as e:
        return Response(
            {'msg':f'Error {e}'},
            status=status.HTTP_404_NOT_FOUND)
    return Response(
        {'msg':'logout successfull'}, 
        status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def userView(request):
    if request.method == 'GET':
        all_users = User.objects.all()
        serialiser = UserSerialiser(all_users, many = True)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    else:
        data = request.data
        serialiser = UserSerialiser(data = data)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_201_CREATED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def userDetailsView(request, **kwargs):
    try:
        user = User.objects.get(pk = kwargs['id'])
    except User.DoesNotExist as e:
        return Response({"details":f"{e}"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        serialiser = UserSerialiser(user)
        return Response(serialiser.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        data = request.data
        serialiser = UserSerialiser(data=data, partial = True)
        if serialiser.is_valid():
            serialiser.save()
            return Response(serialiser.data, status=status.HTTP_202_ACCEPTED)
        return Response(serialiser.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        username = user.username
        msg = f"user {username} deleted successfully!"
        user.delete()
        return Response({"message":msg}, status=status.HTTP_404_NOT_FOUND)    

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def passwordChangeView(request):
    user = request.user
    data = request.data

    if user.check_password(data['old_password']):
        user.set_password(data['new_password'])
        user.save()
        return Response({'msg':'password change successful'})
    else:
        return Response({'msg':'invalid old password'})
    
@api_view(['POST'])
def passwordResetView(request):
    data = request.data
    try:
        user = User.objects.get(username = data['username'])
        code = random.randint(1000, 9999)
        link = uuid.uuid4()
        try:
            PasswordReset.objects.update_or_create(
                user = user,
                code = code, 
                link = link
            )
        except:
            password_reset = PasswordReset.objects.get(user = user)
            password_reset.code = code
            password_reset.link = link
            password_reset.save()
        clk_link = f'http://127.0.0.1:3000/password-reset/{password_reset.link}'
        email = EmailMessage(
            "Password Reset Information",
            f"Your Receiving this email \
                coz you initiated a password reset \
                code {password_reset.code} \
                click {clk_link}",
            "kinyonyidavid@gmail.com",
            ["kinyonyidavid@gmail.com"],
            ["kinyonyidavid@gmail.com"],
            reply_to=["info@todo.com"],
            headers={"Message-ID": "12345"},
        )
        email.send(fail_silently=False)
        return Response(
            {'msg':'please check your mail for instructions'},
            status=status.HTTP_200_OK
        )
    except User.DoesNotExist as e:
        return Response({'msg':f'Error {e}'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def passwordResetDoneView(request, **kwargs):
    data = request.data
    link = kwargs['link']
    if link and data:
        try:
            user= PasswordReset.objects.get(
                code = data['code'],
                link = link
            )
            user.user.set_password(data['password'])
            user.user.save()
            return Response(
                {'msg':'password change successfull'},
                status=status.HTTP_200_OK)
        except PasswordReset.DoesNotExist as e:
            return Response({'msg':f'Error {e}'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'msg':'link and code needed!'}, status=status.HTTP_404_NOT_FOUND)