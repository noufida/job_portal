from django.shortcuts import render
import datetime

from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.authentication import get_authorization_header

from .models import Account,UserToken
from .serializers import AccountSerializer, VerificationSerializer
from . import verify
from . authentication import decode_refresh_token, create_access_token,create_refresh_token,JWTAuthentication

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


@api_view(['POST'])
def login_user(request):

    email = request.data['email']
    password = request.data['password']
    
    user = Account.objects.filter(email=email).first()

    if user is None:
        raise APIException ('Invalid credentials')
    if not user.check_password(password):
        raise APIException ('Invalid credentials')
    
    access_token = create_access_token(user.id)
    refresh_token = create_refresh_token(user.id)

    UserToken.objects.create(
        user_id=user.id,
        token=refresh_token,
        expired_at=datetime.datetime.utcnow()+ datetime.timedelta(days=7),
    )

    response = Response()
    response.set_cookie(key='refresh_token',value=refresh_token, httponly=True)
    response.data = {
        'token':access_token
    }
    return response




@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_user(request):     
    return Response(AccountSerializer(request.user).data)

@api_view(['POST'])
def refresh(request):
    refresh_token = request.COOKIES.get('refresh_token')
    id=decode_refresh_token(refresh_token)

    if not UserToken.objects.filter(
        user_id=id,
        token=refresh_token,
        expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
    ).exists:
        raise APIException ('unauthenticated')
    access_token=create_access_token(id)
    return Response({'token':access_token})

@api_view(['POST'])
def logout_user(request):
    refresh_token = request.COOKIES.get('refresh_token')
    UserToken.objects.filter(token=refresh_token).delete()

    response=Response()
    response.delete_cookie(key='refresh_token')
    response.data={
        'message':'success'
    }
    return response