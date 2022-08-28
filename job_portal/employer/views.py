
from logging import exception
from django.shortcuts import render,redirect
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status

from .models import Employer
from .serializers import EmployerSerializer

from user.authentication import JWTAuthentication

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def register_employer(request):
    data = request.data
    try:
        employer = Employer.objects.create(
            user = request.user,
            company_name = data['company_name'],
            company_website = data['company_website'],
            company_email = data['company_email'],
            company_mobile = data['company_mobile']
        )
        
        serializer = EmployerSerializer(employer, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

