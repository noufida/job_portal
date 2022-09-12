from django.db import models
from user.models import Account
# Create your models here.

class Employer(models.Model):    
    user = models.OneToOneField(Account,on_delete=models.CASCADE,unique=True)
    company_name = models.CharField(max_length=30)
    company_website = models.CharField(max_length=30,null=True,blank=True)
    company_email = models.EmailField(max_length=30,unique=True)
    company_mobile = models.CharField(max_length=10,unique=True)
    company_address = models.CharField(max_length=30)
    employee_count = models.IntegerField()
    description = models.TextField()
   
    def __str__(self):
        return self.company_name



class Category(models.Model):
    job_category = models.CharField(max_length=30)
    created_on = models.DateField(auto_now_add=True)
    updated_on = models.DateField(auto_now=True)
    
    def __str__(self) :
        return self.job_category

    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
    


TYPES=(
    ("full time","full time"),
    ("part time","part time")
)

MODES=(
    ("on-site","on-site"),
    ("remote","remote"),
    ("hybrid","hybrid")
)


class Job(models.Model):
    company = models.ForeignKey(Employer,on_delete=models.CASCADE)
    category = models.ForeignKey(Category,on_delete=models.CASCADE)
    designation = models.CharField(max_length=30)
    vacancies = models.IntegerField(null=True,blank=True)
    location = models.CharField(max_length=30)
    type =models.CharField(max_length=30,choices=TYPES,default="full time")
    workmode =models.CharField(max_length=30,choices=MODES,default="on-site")
    experience_from = models.IntegerField()
    experience_to = models.IntegerField()
    job_description = models.TextField()
    criteria = models.TextField()
    payscale_from = models.IntegerField(null=True,blank=True)
    payscale_to = models.IntegerField(null=True,blank=True)

    def __str__(self) :
        return self.designation
   
    
class Skill(models.Model):
    job = models.ForeignKey(Job,on_delete=models.CASCADE)
    skill = models.CharField(max_length=30)

    def __str__(self) :
        return self.skill



