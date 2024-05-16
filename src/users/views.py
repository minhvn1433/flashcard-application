from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect

from .models import Student, Teacher


def login_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("users:login")
        elif request.session.get("role") == "teacher":
            return redirect("teachers:index")
        elif request.session.get("role") == "student":
            return redirect("students:index")
        else:
            return view_func(request, *args, **kwargs)

    return _wrapped_view


# Create your views here.
@login_required
def index(request):
    return render(request, "users/index.html")


def login_view(request):
    if request.user.is_authenticated:
        if request.session.get("role") == "teacher":
            return redirect("teachers:index")
        elif request.session.get("role") == "student":
            return redirect("students:index")
        else:
            return redirect("users:index")

    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            if Teacher.objects.filter(user=request.user).exists():
                request.session["role"] = "teacher"
                return redirect("teachers:index")
            elif Student.objects.filter(user=request.user).exists():
                request.session["role"] = "student"
                return redirect("students:index")
            else:
                request.session["role"] = "user"
                return redirect("users:index")
        else:
            return render(
                request,
                "users/login.html",
                {"message": "Incorrect username or password."},
            )

    return render(request, "users/login.html")


def logout_view(request):
    logout(request)
    return redirect("users:login")
