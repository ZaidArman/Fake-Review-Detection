from django.contrib.auth.models import User
from django.shortcuts import render

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer, MyTokenObtainPairSerializer


class UserCreate(APIView):
    serializer_class = UserSerializer
    permission_classes = ()
    authentication_classes = ()

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        print(serializer, 'ssss')
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            email = serializer.data['email']
            user = User.objects.filter(email=email).first()
            if user:
                return Response({"message": "User already exists"}, status=400)
            for error in serializer.errors.items():
                print(error)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MyLoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class GoogleRedirectView(APIView):

    def get(self, request, *args, **kwargs):
        token = Token.objects.get(user=request.user)
        response = {
            "email": request.user.email,
            "username": request.user.username,
            "token": token.key,
            "message": "success"
        }
        return Response(response, status=200)
