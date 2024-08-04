from django.urls import path, include

from accounts import views

urlpatterns = [
    path('create/', views.UserCreate.as_view(), name='create_user'),
    path('login/', views.MyLoginView.as_view(), name='login_view'),
]