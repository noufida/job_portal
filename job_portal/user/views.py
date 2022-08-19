from asyncio import exceptions
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException

from .models import Account
from .serializers import AccountSerializer
# Create your views here.

@api_view(['POST'])
def register(request):
    data = request.data

    if data['password'] != data['confirm_password']:
        raise APIException('passwords do not match!')
    serializer = AccountSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)
