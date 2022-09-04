
from django.urls import path
from . import views

urlpatterns = [
    path('job_categories/', views.categories,name='categories'),

    path('register/', views.register_employer,name='register_employer'),
    path('post_job/', views.post_job,name='post_job'),
    path('<str:id>/jobs/', views.get_jobs,name='get_jobs'),
    path('post_job/<str:id>/', views.job_detail,name='job_detail'),

    path('<str:id>/add_skill/', views.add_skill,name='add_skill'),
    path('<str:id>/get_skills/', views.get_skills,name='get_skills'),
    path('<str:id>/delete_skill/<str:skill_id>/', views.delete_skill,name='delete_skill'),
]   