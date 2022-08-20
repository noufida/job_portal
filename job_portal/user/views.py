from asyncio import exceptions
from email import message
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException

from .models import Account
from .serializers import AccountSerializer, VerificationSerializer
from . import verify
# Create your views here.

@api_view(['POST'])
def register(request):
    data = request.data

    if data['password'] != data['confirm_password']:
        raise APIException('passwords do not match!')

    mobile = data['mobile']
    request.session['mobile']=mobile
    verify.send(mobile)
    serializer = AccountSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def verify_code(request):
    try:
        data=request.data
        mobile=request.session['mobile']
        code=data['code']
        if verify.check(mobile,code):
            user=Account.objects.get(mobile=mobile)
            user.is_active=True
            user.save()
            serializer=VerificationSerializer(user,many=False)
            return Response(serializer.data)
        else:
            message={'detail':'otp is not valid'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
    
    except:
        message={'detail':'error in serializer'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
