import json

from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password, CommonPasswordValidator, \
    UserAttributeSimilarityValidator
from django.core.exceptions import ValidationError
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
        
        if not self.user.is_active:
            raise serializers.ValidationError("User account is inactive.")
        
        data['id'] = self.user.id
        data['email'] = self.user.email
        token = Token.objects.get(user=self.user)
        data['token'] = token.key
        data['first_name'] = self.user.first_name
        data['last_name'] = self.user.last_name
        data['is_active'] = self.user.is_active
        data['message'] = 'successful'
        return data


class ResetPasswordEmail(serializers.Serializer):
    email = serializers.EmailField(required=True)


class SetNewPasswordSerializer(serializers.Serializer):
    new_password = serializers.CharField(required=True, min_length=8)
    token = serializers.CharField(required=True)

    def validate_new_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(str(e))
        if CommonPasswordValidator().validate(value):
            raise serializers.ValidationError('This password is too common.')
        if UserAttributeSimilarityValidator().validate(value):
            raise serializers.ValidationError('This password is too similar to personal information.')
        return value