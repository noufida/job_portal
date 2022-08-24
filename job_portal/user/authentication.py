
import jwt,datetime
from rest_framework.exceptions import APIException
from rest_framework.authentication import BaseAuthentication,get_authorization_header
from rest_framework import status

from .models import Account
from rest_framework.response import Response



def create_access_token(id):
    return jwt.encode({
        'user_id':id,
        'exp':datetime.datetime.utcnow()+ datetime.timedelta(seconds=30),
        'iat':datetime.datetime.utcnow()
    }, 'access_secret', algorithm='HS256')


def create_refresh_token(id):
    return jwt.encode({
        'user_id':id,
        'exp':datetime.datetime.utcnow()+ datetime.timedelta(days=7),
        'iat':datetime.datetime.utcnow()
    }, 'refresh_secret', algorithm='HS256')

def decode_access_token(token):
    try:
        print('decoding')
        print(token)
        payload = jwt.decode(token,'access_secret',algorithms='HS256')
        print(payload,"take this go")
        return payload['user_id']
    except:
        print("not working")
        message={'detail':'error in serializer'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

def decode_refresh_token(token):
    try:
        print("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk")
        payload = jwt.decode(token,'refresh_secret',algorithms='HS256')
        print(payload,123456)
        return payload['user_id']
    except:
        print("jj")
        raise APIException('unauthenticated')

class JWTAuthentication(BaseAuthentication):
  
    def authenticate(self,request):
        print(request.headers,"mememe")
        auth  = get_authorization_header(request).split()
        print(auth,"looo")
        print(len(auth))
        if auth and len(auth) == 2:
            token = auth[1].decode('utf-8')
            print(token)
            id = decode_access_token(token)
            user = Account.objects.get(id=id)
            return (user,None)

        print('iiiiiiiiiiii')
        message={'detail':'error in serializer'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)


