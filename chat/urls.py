from django.urls import path, include
from .views import *

urlpatterns = [
  path('', home, name='home'),
  path('<str:room_name>/', room, name='room')
]