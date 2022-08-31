
from logging import exception
from django.shortcuts import render,redirect
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status

from .models import Category, Employer,Job,Skill
from .serializers import EmployerSerializer,JobSerializer,SkillSerializer,CategorySerializer

from user.authentication import JWTAuthentication,JWTAuthenticationEmployer

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
def register_employer(request):
    data = request.data
    print(data,request.user,"iiii")
    try:
        employer = Employer.objects.create(
            user = request.user,
            company_name = data['company_name'],
            company_website = data['company_website'],
            company_email = data['company_email'],
            company_mobile = data['company_mobile'],
            company_address = data['company_address'],
            employee_count = data['employee_count'],
            description = data['description']
        )
        
        serializer = EmployerSerializer(employer, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


#post a job by a verified employer
@api_view(['POST'])
@authentication_classes([JWTAuthenticationEmployer])
def post_job(request):
    data = request.data
    print(data)
    company=Employer.objects.filter(user=request.user).first()
    print(company,"huh")
    try:        
        job = Job.objects.create(
            company = company,
            category_id = data['category'],
            designation = data['designation'],
            vacancies = data['vacancies'],
            location = data['location'],
            type = data['type'],
            workmode = data['workmode'],
            experience_from = data['experience_from'],
            experience_to = data['experience_to'],
            job_description = data['job_description'],
            criteria = data['criteria'],
            payscale_from = data['payscale_from'],
            payscale_to = data['payscale_to']

        )
        print(job,"jobing")
        serializer = JobSerializer(job, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#adding skill sets for a job
@api_view(['POST'])
@authentication_classes([JWTAuthenticationEmployer])
def add_skill(request):
    data = request.data
    print('hello')
    try:        
        skill = Skill.objects.create(
            job_id = data['job'],
            skill = data['skill']
        )
        serializer = SkillSerializer(skill, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#getting categories
@api_view(['GET'])
@authentication_classes([JWTAuthenticationEmployer])
def categories(request):
    try:     
        category = Category.objects.all()
        print(category,"ji")
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
