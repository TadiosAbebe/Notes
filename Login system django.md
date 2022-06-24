# User Authentication and Autorization in Django

In order to allow users to login and sign up on our system it is a good practice to create a separate app that handles user auth for our project

```python
python3 manage.py startapp users
```

create a urls.py file in our users app

and also add your user app to settings.py files of your project, in addition add the url of our app to the main urls.py file

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = {
    path('admin/', admin.site.urls),
    path('users/', include('django.contrib.auth.urls')),
    path('users/', include('users.urls')),
}
```

inside our users app, views.py file add the following code

```python
from django.shortcuts import render
from django.views import generic
from django.contrib.auth.forms import UserCreationForm
from django.urls import reverse_lazy

class UserRegisterView(generic.CreateView):
    form_class = UserCreationForm
    template_name = 'users/register.html'
    success_url = reverse_lazy('login')
```

inside urls.py of our users app

```python
from django.urls import path
from .views import UserRegisterView

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
]
```

now we can connect a url to a link to our register route

```htm
<a href="{% url 'register' %}">register</a>
<a href="{% url 'login' %}">login</a>
```

Then in our settings.py file add the following code at the end

```python
LOGIN_REDIRECT_URL = 'home'
LOGOUT_REDIRECT_URL = 'home'
```


