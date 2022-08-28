from django.db import models
from user.models import Account
# Create your models here.

class Employer(models.Model):    
    user = models.ForeignKey(Account,on_delete=models.CASCADE)
    company_name = models.CharField(max_length=30)
    company_website = models.CharField(max_length=30,null=True,blank=True)
    company_email = models.EmailField(max_length=30,unique=True)
    company_mobile = models.CharField(max_length=10,unique=True)
   
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


class Subcategory(models.Model):
    job_subcategory = models.CharField(max_length=30)
    job_category = models.ForeignKey(Category,on_delete=models.CASCADE)
    created_on = models.DateField(auto_now_add=True)
    updated_on = models.DateField(auto_now=True)

    def __str__(self) :
        return self.job_subcategory

    
    class Meta:
        verbose_name = 'Subcategory'
        verbose_name_plural = 'Subcategories'


