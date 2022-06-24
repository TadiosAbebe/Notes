# Creating a Django React Application

## Setting up Django

install a virtual enviroment

```
pip install pipenv
```

to create and activate a virtual enviroment, navigate to your project folder and

```
pipenv shell
```

this will create a pip file in that directory, where all our installed packages go

to install django, djangorestframework, django-rest-knox(which does token auth)

```
pipenv install django djangorestframework django-rest-knox
```

we can see that this will add the packages in our pip file, and it is also going to create a lock file with all the dependecies and versions,

then we need to generate our django app

```python
django-admin startproject leadmanager
```

the above command created a directory named leadmanager and inside there is a leadmanger directory and a manage.py file which the cli for django

we has to always check if we are using the correct interpeter for our project, to do this in our vscode command palet write select interpreter and choose the correct interpreter of our virtual enviroment

now we need to generate a django app

```python
python manage.py startapp leads
```

when ever we create an app in our project we need to add it our INSTALLED_APPS section of our settings.py

so for our project we need to add

```python
'leads',
'rest_framework'
```

now we need to go to our leads folder and models.py file and create our model

```python
# leadmanager/leads/models.py
from django.db import models

class Lead(models.model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    message = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

now we need to create and run migration to create our database and tables, for this we run

```python
python manage.py makemigrations
python manage.py migrate
```

this will crate a migration file and the migrate our data

we can also create a specific migration and migrate

```python
python manage.py makemigrations leads
python manage.py migrate
```

## Adding data to our Model

we can add data to our database through djangos admin interface to do this we will go to our leadmanger/leads/models.py file add the following code

```python
from django.contrib import admin
from .models import Lead

class LeadAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message', 'created_at')

#Register your models here.
admin.site.register(Lead, LeadAdmin)
```

now we need to create a superuser account to access the admin interface.

```
python manage.py createsuperuser
```

we will be prompted to enter a username email and password for the superuser, after this we can run our server and navigate to the admin interface to populate the neccessary data

## Creating a REST API

now that the database is setup lets go to our api, when we are using a rest framework there is something called serializer. and this **Serializer** allows complex data such as querysets and model instances to be converted to python datatypes that can be easily rendered to json xml and other content types.

on our leads app we create a file called serializers.py

```python
# leadmanager/leads/serializers.py
from rest_framework import serializers
from leads.models import Lead

#lead serializer
class LeadSerializer(serializer.ModelSerializer):
    class Meta:
        model: Lead
        fields: '__all__'
        # '__all__' will bring all fields defined in our Leads model
```

the next thing we need to do is creat our lead api, so inside our leads folder create a file called api.py

```python
# leadmanager/leads/apis.py
from leads.models import Lead
from rest_framework import viewsets, permissiona
from .serializers import LeadSerializer

# Lead viewsets
# viewset allows us to create a full crud api without having to specify for the functionality

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()# a queryset that grabs all the leads
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LeadSerializer

```

now we need to specifiy urls, in our root leadmanager project we have a urls file

```python
# leadmanger/leadmanger/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('leads.urls')),
]
```

now lets go into leads app and create url.py file and for our api endpoints instead of declaring a path like we used to do before we use the rest_framework router

```python
from rest_framework import routers
from .api import LeadViewSet

router = routers.DefaultRouter() # bringing in our router
router.register('api/lead', LeadViewSet, 'leads') # registering our api endpoint
# register takes register('api endpoint', viewset, name)

urlpatterns = router.urls # simply gives us the patterns that are registerd for in our router endpoint
```

now we have a simple rest api and we can run our server with

```python
python manage.py runserver
```

from here we can use postman to test our api, and if we send a GET request to http://localhost:8000/api/leads/ this will return us an empty array on the body of our response which is correct since we have notting stored in our db

we can make a POST request to http://localhost:8000/api/leads/ and add Content Type of application/json, and for the body add the following json code

```json
{
	"name": "Jhon Doe",
	"email": "jhon@gmail.com",
	"message": "contact me"
}
```

so now we have a full curd api

## Setting up React

for our project we are not going to use create react app since we are integrating react in our djanog project, we are going to have a frontend django app in our project
and inside there is where we gonna have for instance the index.html file which we are going to have that as template and that is going to be basically the entry point to react, we will have index.js for the entry point of javasctipt and that will point to the main app component that will get loaded

so first lets create a django app called frontend

```python
django-admin startapp frontend
```

now lets go to that frontend folder and prepare the directory structure for holding React components

```
mkdir -p ./frontend/src/component
mkdir -p ./frontend/static/frontend
mkdir -p ./frontend/templates/frontend
```

now within the frontend folder lets initialize npm enviroment

```
npm init -y
// the -y flag means with all the default settings
```

next install webpack and webpack cli

```
npm i webpack webpack-cli --save-dev
// alternatively we can add the flag -D beside npm i and remove the --save-dev, they mean the same
```

now lets open the package.json and configure two scripts, one for production and one for development

```javascript
"scripts":{
    "dev": "webpack --mode development --entry ./src/index.js --output-path ./static/frontend",
    "build": "webpack --mode production --entry ./src/index.js --output-path ./static/frontend"
}
```

now lets install babel for transpiling our code and also react:

```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properites --save-dev
npm i react react-dom --save-dev
```

now lets configure babel with a .babelrc(still inside the ./frontend folder)

```javascript
{
    "presets": [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    "plugins":[
        "transform-class-properties"
    ]
}
```

and finally create a webpack.config.js file for configuring babel-loader

```javascript
module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/, // we are looking at all the js files
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
};
```

## Preparing the frontend app

first lets create a view in ./frontend/views.py

```python
from django.shortcuts import render

def index(request):
    return render(request, 'frontend/index.html')
```

then create a template in ./frontend/templates/frontend/index.html and in that file

```html
<html>
    <head>
        <Meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Django Rest with React</title>
    </head>
    <body>
        <div id="app">
        </div>
    </body>
    {% load static %}
    <script src="{% static "frontend/main.js" %}"></script>
</html>
```

now lets configure the new url mapping to include the frontend in ./leadmanager/leadmanager/urls.py

```python
# ./leadmanager/leadmanger/urls.py
urlpattern = [
    path('', include('frontend.urls))
]
```

now lets create urls.py file in our frontend app

```python
# ./forntend/urls.py
from django.urls import path
from . import views
urlpatterns = [
    path('',views.index),
]
```

finally lets add the frontend app to our settings.py in the INSTALLED_APPS section

## Writting React code

now lets create a new file in ./frontend/src/component/App.js it will be a React Component for fetching and displaying data:

```javascript
import React, { Component } from "react";
import { render } from "react-dom;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            placeholder: "Loading"
        };
    }
    componentDidMount() {
        fetch("api/lead")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return {placeholder: "Something went Wrong"};
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }
    render() {
        return (
            <ul>
                {this.state.data.map(contact => {
                    return (
                        <li key={contact.id}>
                            {contact.name} - {contact.email}
                        </li>
                    );
                })}
            </ul>
        );
    }
}
export default App;
const container = document.getElementById("app");
render(<App />, container);
```

now lets create the entry point for webpack in ./frontend/src/index.js and import our App component

```javascript
import App from "./component/App"'
```

now we are ready to test things our. run

```
npm run dev
```

inside you frontend folder, and start the developement server with

```
python manage.py runserver
```
