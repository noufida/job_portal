
from django.urls import path
from . import views

urlpatterns = [
    path('job_categories/', views.categories,name='categories'),

    path('register/', views.register_employer,name='register_employer'),
    path('post_job/', views.post_job,name='post_job'),
    path('add_skill/', views.add_skill,name='add_skill'),
]   