from django.urls import path

from . import views

app_name = "students"
urlpatterns = [
    path("", views.index, name="index"),
    path("multiple_choice/", views.multiple_choice, name="multiple_choice"),
    path("true_false/", views.true_false, name="true_false"),
    path("writing/", views.writing, name="writing"),
    path("matching/", views.matching, name="matching"),
    path("get_flashcards/", views.get_flashcards, name="get_flashcards"),
    path("update_results/", views.update_results, name="update_results"),
    path("student_data/<int:id>/", views.student_data, name="student_data"),
]
