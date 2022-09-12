
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register,name='register'),
    path('verify/', views.verify_code,name='verify'),
    path('login/', views.login_user,name='login'),
    path('get_user/', views.get_user,name='get'),
    path('refresh/', views.refresh,name='refresh'),
    path('logout/', views.logout_user,name='logout'),
    path('forgot_password/', views.forgot_password,name='forgot_password'),
    path('resetpassword_validate/<uidb64>/<token>',views.resetpassword_validate,name='resetpassword_validate'),
    path('resume/', views.resume,name='resume'),
    path('profile/', views.profile,name='profile'),
    path('qualification/', views.qualification,name='qualification'),
    path('get_qualification/', views.get_qualification,name='get_qualification'),
    path('qualification/<str:id>/', views.delete_qualification,name='delete_qualification'),
    path('experience/', views.experience,name='experience'),
    path('get_experience/', views.get_experience,name='get_experience'),
    path('experience/<str:id>/', views.delete_experience,name='delete_experience'),
    path('skill/', views.add_skill,name='add_skill'),
    path('get_skill/', views.get_skill,name='get_skill'),
    path('skill/<str:id>/', views.delete_skill,name='delete_skill'),
]       