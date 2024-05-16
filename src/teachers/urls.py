from django.urls import path

from . import views

app_name = "teachers"
urlpatterns = [
    path("", views.index, name="index"),
    path("assignment/", views.assignment, name="assignment"),
    path("assignment_flashcards/", views.assignment_flashcards, name="assignment_flashcards"),
    path("search/", views.search, name="search"),
    path("search_flashcards/", views.search_flashcards, name="search_flashcards"),
    path("search_students/", views.search_students, name="search_students"),
    path("search_decks/", views.search_decks, name="search_decks"),
    path("flashcard/<int:id>/", views.flashcard, name="flashcard"),
    path("student/<int:id>/", views.student, name="student"),
    path("deck/<int:id>/", views.deck, name="deck"),
    path("students/", views.students, name="students"),
    path("students_student/", views.students_student, name="students_student"),
    path("new_deck/", views.new_deck, name="new_deck"),
    path("deck_flashcards/<int:id>/", views.deck_flashcards, name="deck_flashcards"),
    path("edit_deck/<int:id>/", views.edit_deck, name="edit_deck"),
    path("delete_deck/<int:id>/", views.delete_deck, name="delete_deck"),
]
