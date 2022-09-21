
from logging import exception
from django.shortcuts import render,redirect
from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework import filters
from rest_framework import generics
from user.models import Account, Experience, Qualification, SkillSet
from user.serializers import AccountSerializer, ExperienceSerializer, QualificationSerializer, SkillSetSerializer

from .models import Category, Employer,Job, JobApplication,Skill
from .serializers import EmployerSerializer, JobApplicationSerializer,JobSerializer,SkillSerializer,CategorySerializer

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
        if Employer.objects.filter(user=request.user).exists:
            message = {'detail': 'Acoount already exists'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)
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
def add_skill(request,id):
    data = request.data
    print(id,request.data,"dddd")
    try: 
        skill = Skill.objects.create(
            job_id = id,
            skill = data['skill']
        )
        serializer = SkillSerializer(skill, many=False)
        return Response(serializer.data)
    except:
       
        message = {'detail': 'Job does not exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
      

#getting categories
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def categories(request):
    try:     
        category = Category.objects.all()
        print(category,"ji")
        serializer = CategorySerializer(category, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#getting skills for a job
@api_view(['GET'])
@authentication_classes([JWTAuthenticationEmployer])
def get_skills(request,id):
    try:
        skill = Skill.objects.filter(job_id=id)
        print(skill,"ji")
        serializer = SkillSerializer(skill, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Job does not exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)   
     


#deleting skill for a job
@api_view(['DELETE'])
@authentication_classes([JWTAuthenticationEmployer])
def delete_skill(request,id,skill_id):
    try:     
        Skill.objects.filter(job_id=id,id=skill_id).delete()
        message={'detail':'success'}
        return Response(message,status=status.HTTP_200_OK)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


#getting jobs of a company
@api_view(['GET'])
@authentication_classes([JWTAuthenticationEmployer])
def get_jobs(request,id):
    try:    
        print("ahooy") 
        jobs = Job.objects.filter(company__user_id=id).order_by('-id')
        # j=Job.objects.get(id=14)
        # p=j.job_skill.all()
        # print(p,"jiiiiiiiiiiiiiii")
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


#getting details of a particular job
@api_view(['GET'])
@authentication_classes([JWTAuthenticationEmployer])
def job_detail(request,id):
    try:
        job = Job.objects.get(id=id)
        print(job,"ji")
        serializer = JobSerializer(job, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#getting all job
@api_view(['GET'])
def jobs(request):
    try:
        job = Job.objects.all()
        print(job,"ji")
        serializer = JobSerializer(job, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#getting details of a particular job
@api_view(['GET'])
def job_des(request,id):
    try:
        job = Job.objects.get(id=id)
        print(job,"ji")
        serializer = JobSerializer(job, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

#getting skills of a particular job
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def skill_for_job(request,id):
    try:
        skills=Skill.objects.filter(job=id)
        print(skills,"ji")
        serializer = SkillSerializer(skills, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class JobAPIView(generics.ListCreateAPIView):
    search_fields = ['designation','category__job_category','company__company_name','location']
    filter_backends = (filters.SearchFilter,)
    queryset = Job.objects.all()
    serializer_class = JobSerializer


#getting whether a  particular accconut is having a employer account
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def emp_account(request):  
    try:
        print("check for employer")
        check = Employer.objects.filter(user=request.user).exists()
        data = {
            'status' : check
        }
        return Response(data)
    except:
        message = {'detail': 'Some problem occured in checking account'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


#getting candidates applied for a particular job
@api_view(['GET'])
@authentication_classes([JWTAuthenticationEmployer])
def applicants(request,id):
    try:
        print('kkkkkkkkk')
        jobapplication=JobApplication.objects.filter(job_id=id).order_by('-id')
        print(jobapplication)
        # a=[x.get(y) for x in jobapplication for y in x]
        # print(a)
        # user=Account.objects.filter(id__in=a)
        # serializer = AccountSerializer(user, many=True)
        # return Response(serializer.data)
        serializer = JobApplicationSerializer(jobapplication,many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)



#getting account of applicants with a id
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def app_details(request,id):  
    print(request.data)
    try:
        print("hello")
        user=Account.objects.get(id=id)
        serializer = AccountSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def app_exp(request,id):  
    print(request.data)
    try:
        print("hello")
        exp=Experience.objects.filter(user_id=id)
        serializer = ExperienceSerializer(exp, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def app_qual(request,id):  
    print(request.data)
    try:
        print("hello")
        qual=Qualification.objects.filter(user_id=id)
        serializer = QualificationSerializer(qual, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
def app_skills(request,id):  
    print(request.data)
    try:
        print("hello")
        skill=SkillSet.objects.filter(user_id=id)
        serializer = SkillSetSerializer(skill, many=True)
        return Response(serializer.data)
    except:
        message = {'detail': 'Some problem occured'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)