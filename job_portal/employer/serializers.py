from dataclasses import fields
from .models import Employer
from rest_framework import serializers

class EmployerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employer
        fields = '__all__'
        
     

