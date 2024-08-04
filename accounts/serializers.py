import json

from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(min_length=8)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
        )
        user.is_active = True
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.save()
        return user

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

    def to_representation(self, instance):
        data = super(UserSerializer, self).to_representation(instance)
        data['message'] = "successful"
        return data


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['email'] = self.user.email
        token = Token.objects.get(user=self.user)
        data['token'] = token.key
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['is_active'] = self.user.is_active
        data['message'] = 'successful'
        return data
