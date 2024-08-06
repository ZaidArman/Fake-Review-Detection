
# Fake Review Detection


## To strart the project: 

clone the repo:
'''
git clone https://github.com/ZaidArman/Fake-Review-Detection.git
'''

You will be on BACKEND Base folder (where you will see README.md file others)


## create virual enviroment:

'''
python -m venv venv
'''

Activate the venv:

Window:

'''
source venv/scripts/activate
'''

MacOS:

'''
source venv/bin/activate
'''


# Install requirements: for Backend

'''
pip install -r requirements.txt
'''

## runserver (Django)

if you see (manage.py) file in current directory, then run

'''
python manage.py runserver
'''

but in case, if you didn't do migrations then firstly run:

'''
python manage.py makemigratins

python manage.py migrate

python manage.py runserver
'''

after runserver, you will get the url, like:
'''
http://127.0.0.1:8000
'''
OR
'''
http://localhost:8000
'''

and if you want to create super user for Django Admin site, then run:
'''
python manage.py createsuperuser
'''

# Work on ngrok
if the frontend url didn't work correctly, the install on your system 
'''
pip install ngrok
'''

then run the below command for ngrok domain:


'''
ngrok 8000
'''
it will give you a domain name, use this domain name and paste it on backend/settings.py 
where settings.py file contain any url like this:
' ngrok-free.app '
remove it and paste your ngrok full url.



# Run frontend:

When run the backend, then open a new separate terminal, and go to the frontend folder (1Frontend):

'''
cd 1Frontend 
'''

then install the npm and it's requirements:

'''
npm install
'''

and run the frontend:

'''
npm run dev
'''

it will give you the url, like:

'''
http://127.0.0.1:5173/
'''



# Regarding .env file

open google account setting -> app password -> create app -> NameOfYourApp, and copy the code from it, paste code in .env file :
EMAIL_HOST_PASSWORD = 'Your App Password'
EMAIL_HOST_USER = 'Your gmail ID'