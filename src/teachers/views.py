from django.db.models import Q
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse

from users.models import Flashcard, Student, Teacher, Deck, Result


def login_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("users:login")
        elif request.session.get("role") == "teacher":
            return view_func(request, *args, **kwargs)
        elif request.session.get("role") == "student":
            return redirect("students:index")
        else:
            return redirect("users:index")

    return _wrapped_view


# Create your views here.
@login_required
def index(request):
    return redirect("teachers:assignment")


@login_required
def assignment(request):
    teacher = Teacher.objects.get(user=request.user)
    flashcards = teacher.flashcards.all()

    return render(request, "teachers/assignment.html", {"flashcards": flashcards})


@login_required
def assignment_flashcards(request):
    teacher = Teacher.objects.get(user=request.user)

    if request.method == "POST":
        flashcard_id = request.POST.get("flashcard_id")
        flashcard = Flashcard.objects.get(id=flashcard_id)
        action = request.POST.get("action")

        if action == "add":
            teacher.add_flashcard(flashcard)
        elif action == "remove":
            teacher.remove_flashcard(flashcard)

    flashcards = teacher.flashcards.all()
    flashcards_list = list(flashcards.values("id", "front", "back"))
    for flashcard in flashcards_list:
        flashcard["url"] = reverse("teachers:flashcard", args=[flashcard["id"]])

    return JsonResponse({"flashcards": flashcards_list})


@login_required
def search(request):
    return render(request, "teachers/search.html")


@login_required
def search_flashcards(request):
    query = request.GET.get("query", "")
    flashcards_list = []
    if query:
        flashcards = Flashcard.objects.filter(Q(front__icontains=query) | Q(back__icontains=query))[:50]
        flashcards_list = list(flashcards.values("id", "front", "back"))
        for flashcard in flashcards_list:
            flashcard["url"] = reverse("teachers:flashcard", args=[flashcard["id"]])

    return JsonResponse({"flashcards": flashcards_list})


@login_required
def search_students(request):
    query = request.GET.get("query", "")
    students_list = []
    if query:
        students = Student.objects.filter(user__username__icontains=query)[:50]
        students_list = list(students.values("user__id", "user__username"))
        for student in students_list:
            student["url"] = reverse("teachers:student", args=[student["user__id"]])

    return JsonResponse({"students": students_list})


@login_required
def search_decks(request):
    query = request.GET.get("query", "")
    decks_list = []
    if query:
        decks = Deck.objects.filter(name__icontains=query)[:50]
        decks_list = list(decks.values("id", "name"))
        for deck in decks_list:
            deck["url"] = reverse("teachers:deck", args=[deck["id"]])

    return JsonResponse({"decks": decks_list})


@login_required
def flashcard(request, id):
    flashcard = Flashcard.objects.get(id=id)

    return render(request, "teachers/flashcard.html", {"flashcard": flashcard})


@login_required
def student(request, id):
    student = Student.objects.get(user__id=id)
    results = Result.objects.filter(student=student)

    return render(
        request, "teachers/student.html", {"student": student, "results": results}
    )


@login_required
def deck(request, id):
    deck = Deck.objects.get(id=id)
    flashcards = deck.flashcards.all()

    return render(request, "teachers/deck.html", {"deck": deck, "flashcards": flashcards})


@login_required
def students(request):
    teacher = Teacher.objects.get(user=request.user)
    students = teacher.students.all()

    return render(request, "teachers/students.html", {"students": students})


@login_required
def students_student(request):
    teacher = Teacher.objects.get(user=request.user)

    if request.method == "POST":
        student_id = request.POST.get("student_id")
        student = Student.objects.get(user__id=student_id)
        action = request.POST.get("action")

        if action == "add":
            teacher.add_student(student)
        elif action == "remove":
            teacher.remove_student(student)

    students = teacher.students.all()
    students_list = list(students.values("user__id", "user__username"))
    for student in students_list:
        student["url"] = reverse("teachers:student", args=[student["user__id"]])

    return JsonResponse({"students": students_list})


@login_required
def new_deck(request):
    if request.method == "POST":
        teacher = Teacher.objects.get(user=request.user)
        num_decks = Deck.objects.filter(teacher=teacher).count()
        deck = Deck(name=f"My Deck #{num_decks + 1}", teacher=teacher)
        deck.save()

        return redirect("teachers:deck", id=deck.id)
    
@login_required
def deck_flashcards(request, id):
    deck = Deck.objects.get(id=id)
    
    if request.method == "POST":
        flashcard_id = request.POST.get("flashcard_id")
        flashcard = Flashcard.objects.get(id=flashcard_id)
        action = request.POST.get("action")

        if action == "add":
            deck.add_flashcard(flashcard)
        elif action == "remove":
            deck.remove_flashcard(flashcard)
        
    flashcards = deck.flashcards.all()
    flashcards_list = list(flashcards.values("id", "front", "back"))
    for flashcard in flashcards_list:
        flashcard["url"] = reverse("teachers:flashcard", args=[flashcard["id"]])

    return JsonResponse({"flashcards": flashcards_list})

@login_required
def edit_deck(request, id):
    deck = Deck.objects.get(id=id)

    if request.method == "POST":
        deck.name = request.POST.get("deck-name")
        deck.save()
    
        return redirect("teachers:deck", id=deck.id)

@login_required
def delete_deck(request, id):
    if request.method == "POST":
        deck = Deck.objects.get(id=id)
        deck.delete()

        return redirect("teachers:assignment")
