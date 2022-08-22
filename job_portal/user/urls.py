
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register,name='register'),
    path('register/verify/', views.verify_code,name='verify'),
    path('login/', views.login_user,name='login'),
    path('get_user/', views.get_user,name='get'),
    path('refresh/', views.refresh,name='refresh'),
    path('logout/', views.logout_user,name='logout'),
    path('forgot_password/', views.forgot_password,name='forgot_password'),
    path('resetpassword_validate/<uidb64>/<token>',views.resetpassword_validate,name='resetpassword_validate'),
   
    path('reset_password/', views.reset_password,name='reset_password'),
]   