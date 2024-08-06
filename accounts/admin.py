# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('username', 'email', 'is_staff', "first_name", "last_name", 'is_active')
    # Add or override other fields and methods if needed

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
