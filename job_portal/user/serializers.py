from dataclasses import fields
from .models import Account
from rest_framework import serializers

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name','last_name','mobile','email','password']

        extra_kwargs = {
            'password':{'write_only':True}
        }

    def create(self,validated_data):
        
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

class VerificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Account
        fields=['is_active']