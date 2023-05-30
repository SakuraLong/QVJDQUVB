"""
URL configuration for Arcaea_MySQL project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

# -*- coding: utf-8 -*-

from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('deleteAccount/', views.deleteAccount, name='deleteAccount'),
    path('getFriends/', views.getFriends, name='getFriends'),
    path('addFriend/', views.addFriend, name='addFriend'),
    path('deleteFriend/', views.deleteFriend, name='deleteFriend'),
    path('getScores/', views.getScores, name='getScores'),
    path('switchChar/', views.switchChar, name='switchChar'),
    path('uploadScore/', views.uploadScore, name='uploadScore'),
    path('sendMessage/', views.sendMessage, name='sendMessage'),

    # path('show/', views.show, name='show'),  # 页面展示
    # path('process/', views.process,name='process'),  # ajax请求接口
]


