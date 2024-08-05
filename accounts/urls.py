from django.urls import path

from accounts import views

urlpatterns = [
    path('create/', views.UserCreate.as_view(), name='create_user'),
    path('login/', views.MyLoginView.as_view(), name='login_view'),
    path('password_reset/', views.CustomForgetPasswordView.as_view(), name='password_reset'),
    path('password_reset/confirm/', views.SetNewPasswordView.as_view(), name='password_reset_confirm'),
]
