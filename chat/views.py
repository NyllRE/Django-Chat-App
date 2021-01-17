from django.shortcuts import render,redirect
from django import forms

# Create your views here.

def home(request):
  return render(request, 'home.html', {})


class group(forms.Form):
  group_name = forms.CharField(label='Group Name', max_length=10)

def room(request, room_name):
  form = group()
  if request.method == "POST":
    form = group(request.POST)
    if form.is_valid():
      groupname = form.cleaned_data.get('group_name')
      return redirect('../'+groupname)

  return render(request, 'chat.html', {
    'room_name': room_name,
    'group_add': form
  })