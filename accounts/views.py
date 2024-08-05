from django.conf import settings
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer, MyTokenObtainPairSerializer, ResetPasswordEmail, SetNewPasswordSerializer
from .utils import EmailService


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


class CustomForgetPasswordView(APIView):
    serializer_class = ResetPasswordEmail
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.filter(email=email).first()
            if user:
                EmailService().send_email(email)
                return Response({"message": "success"}, status=200)
            else:
                return Response({"message": "success"}, status=200)
        else:
            return Response(serializer.errors)


class SetNewPasswordView(APIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            try:
                token = Token.objects.get(key=serializer.validated_data['token'])
            except:
                return Response({"message": "token is incorrect"})
            if token:
                user = token.user
                new_password = serializer.validated_data['new_password']
                user.set_password(new_password)
                user.is_active = True
                user.save()
                return Response({"message": "success", }, status=200)
            return Response({"message": "token not valid", }, status=400)
        else:
            return Response(serializer.errors)
