from pipes import quote
from django.shortcuts import render,redirect
import datetime
from django.contrib import auth

from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import APIException
from rest_framework.authentication import get_authorization_header

from .models import Account, Resume,UserToken,Profile,Qualification,Experience,SkillSet
from .serializers import AccountSerializer, VerificationSerializer,ResumeSerializer,ProfileSerializer,QualificationSerializer,ExperienceSerializer,SkillSetSerializer
from . import verify
from . authentication import decode_refresh_token, create_access_token,create_refresh_token,JWTAuthentication
from employer.models import JobApplication
from employer.serializers import JobApplicationSerializer

#verification_email
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import EmailMessage

# Create your views here.

@api_view(['POST'])
def register(request):
    
    data = request.data

    if data['password'] != data['confirm_password']:
        message={'detail':'passwords does not match'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)
  
    mobile = data['mobile']
    request.session['mobile']=mobile
    verify.send(mobile)
    serializer = AccountSerializer(data=data)
    a=serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)

@api_view(['POST'])
def verify_code(request):
    try:
        data=request.data
        mobile=data['mobile']
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
        # raise APIException ('Invalid credentials')
        response = Response()
        response.data = {
            'message':'invalid credentials'
        }
        return response
            
    if not user.check_password(password):
        # raise APIException ('Invalid credentials')
        response = Response()
        response.data = {
            'message':'invalid credentials'
        }
        return response
    user_verified = auth.authenticate(email=email, password=password)
    
    if user_verified:
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
            'token':access_token,
            'refresh':refresh_token,
            'user_id':user.id,
            'first_name':user.first_name,
            'last_name':user.last_name,
            'email':user.email,
            'is_active':user.is_active,
            'is_staff':user.is_staff,
        }
        return response
    else:
        message={'detail':'not verified'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_user(request):  
    print('hiiii')   
    return Response(AccountSerializer(request.user).data)

@api_view(['POST'])
def refresh(request):
    print("im refreshing!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",request.data)

    data=request.data['refresh']
    print(data)
    # refresh_token = request.COOKIES.get('refresh_token')
    # print(refresh_token,"ref")
    id=decode_refresh_token(data)
    print(id,"id")
    # if not UserToken.objects.filter(
    #     user_id=id,
    #     token=refresh_token,
    #     expired_at__gt=datetime.datetime.now(tz=datetime.timezone.utc)
    # ).exists:
    #     raise APIException ('unauthenticated')
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

@api_view(['POST'])
def forgot_password(request):
    data=request.data
    email = data['email']
    if Account.objects.filter(email=email).exists():
        print(email)
        user = Account.objects.get(email__exact=email)
        print(user)
        #reset password email
        current_site = get_current_site(request)
        mail_subject = 'Reset Your Password'
        message = render_to_string('user/reset_password_email.html',{
            'user' : user,
            'domain' : current_site,
            'uid' : urlsafe_base64_encode(force_bytes(user.id)),
            'token' : default_token_generator.make_token(user),
        })
        to_email = email
        send_email = EmailMessage(mail_subject, message, to=[to_email])
        send_email.send()

        message={'detail':'email has sent succesfully'}
        return Response(message,status=status.HTTP_200_OK)
        

    else:
        print("no such account")
        message={'detail':'Account Does not Exist'}
        return Response(message,status=status.HTTP_400_BAD_REQUEST)

  

def resetpassword_validate(request,uidb64,token):
    if request.method=='POST':
        try:            
            uid = urlsafe_base64_decode(uidb64).decode()
            user = Account._default_manager.get(pk=uid)
        except(TypeError, ValueError, OverflowError, Account.DoesNotExist):
            user = None
        
        if user is not None and default_token_generator.check_token(user,token):
            request.session['uid'] = uid
            print('succcess') 
            password = request.POST['password']
            confirm_password = request.POST['confirm_password']

            if password == confirm_password:
                print('passwords same')
                uid = request.session.get('uid')
                user = Account.objects.get(pk=uid)
                user.set_password(password)
                user.save()
                return render(request,'user/password_success.html')
     
        else:
            message={'detail':'link expired'}
            return Response(message,status=status.HTTP_400_BAD_REQUEST)
    else:
        print('no')
        return render(request,'user/reset_password.html')

#uploading resume of user
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def resume(request):
     
    try:  
        print(request.user,'hiiiiii')  
        print(request.FILES,"fdge") 
        resume = Resume.objects.create(
            user = request.user,
            resume = request.FILES['resume']
        )
        print(resume)
        serializer = ResumeSerializer(resume, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# creating profile of candidates
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def profile(request):  
    print(request.data)
    try:
        print("hello")
        profile = Profile.objects.create(
            user = request.user,
            experienced = request.data['experienced'],
            desired_job = request.data['desired_job'],
            desired_location = request.data['desired_location']
        )
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# adding qualifications of candidates
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def qualification(request):  
    print(request.data)
    try:
        print("hello")
        qualification = Qualification.objects.create(
            user = request.user,
            degree = request.data['degree'],
            college = request.data['college'],
            joining_year = request.data['joining_year'],
            passout_year = request.data['passout_year']
        )
        serializer = QualificationSerializer(qualification, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# getting qualifications of particular candidates
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_qualification(request):  
    print(request.data)
    try:
        print("hello")
        qualification = Qualification.objects.filter(user=request.user).order_by('-id')
        serializer = QualificationSerializer(qualification, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# deleting particular qualification
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
def delete_qualification(request,id):  
    print(request.data)
    try:
        print("hello")
        qualification = Qualification.objects.get(id=id)
        qualification.delete()
        message={'detail':'success'}
        return Response(message,status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# adding experiences of candidates
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def experience(request):  
    print(request.data)
    try:
        print("hello")
        experience = Experience.objects.create(
            user = request.user,
            designation = request.data['designation'],
            company = request.data['company'],
            start = request.data['start'],
            end = request.data['end'],
            description = request.data['description']
        )
        serializer = ExperienceSerializer(experience, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# getting experiences of particular candidates
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_experience(request):  
    print(request.data)
    try:
        print("hello")
        experience = Experience.objects.filter(user=request.user).order_by('-id')
        serializer = ExperienceSerializer(experience, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



# deleting particular experience
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
def delete_experience(request,id):  
    print(request.data)
    try:
        print("hello")
        experience = Experience.objects.get(id=id)
        experience.delete()
        message={'detail':'success'}
        return Response(message,status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



#adding skill sets 
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def add_skill(request):
    data = request.data
    
    try:        
        skillset = SkillSet.objects.create(
            user = request.user,
            skill = data['skill']
        )
        serializer = SkillSetSerializer(skillset, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# deleting particular skill
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
def delete_skill(request,id):  
    print(request.data)
    try:
        print("hello")
        skillset = SkillSet.objects.get(id=id)
        skillset.delete()
        message={'detail':'success'}
        return Response(message,status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

# getting skills of particular candidates
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def get_skill(request):  
    print(request.data)
    try:
        print("hello")
        skillset = SkillSet.objects.filter(user=request.user).order_by('-id')
        serializer = SkillSetSerializer(skillset, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# candidates applying for jobs
@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def apply(request,id): 
    print("applyyyyyyyyyyyyyyyy") 
    print(request.data)
    try:
        print("hello")
        apply = JobApplication.objects.create(
            user = request.user,
            job_id = id
        )
        serializer = JobApplicationSerializer(apply, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)