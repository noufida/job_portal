from django.contrib import admin
from .models import Account,Resume,Profile

# Register your models here.
admin.site.register(Account)
admin.site.register(Resume)
admin.site.register(Profile)