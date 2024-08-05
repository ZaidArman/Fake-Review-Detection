from django.conf import settings
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.authtoken.models import Token
RESET_PASSWORD_URL = settings.RESET_PASSWORD_URL

class EmailService(object):

    def send_email(self, email):
        subject = 'Reset your password'
        user = User.objects.filter(email=email).first()
        token = Token.objects.get(user=user)
        recipient = email
        context = {
            'firstname': user.first_name,
            'reset_link': f"{RESET_PASSWORD_URL}?token={token}"
        }
        html_message = render_to_string('email/reset_password.html', context)
        plain_message = strip_tags(html_message)
        try:
            send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [recipient],
                      fail_silently=False, html_message=html_message)
        except Exception as e:
            print(e)