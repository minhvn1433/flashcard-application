from django.core.files.storage import default_storage
from django.http import JsonResponse
from django.shortcuts import render, redirect
import json

from users.models import Flashcard, Student, Teacher, Deck, Result

def login_required(view_func):
    def _wrapped_view(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect("users:login")
        elif request.session.get("role") == "teacher":
            return redirect("teachers:index")
        elif request.session.get("role") == "student":
            return view_func(request, *args, **kwargs)
        else:
            return redirect("users:index")
    return _wrapped_view


# Create your views here.
@login_required
def index(request):
    student = Student.objects.get(user=request.user)
    results = Result.objects.filter(student=student)

    new_cards = results.filter(state=Result.NEW_CARDS).count()
    still_learning = results.filter(state=Result.STILL_LEARNING).count()
    almost_done = results.filter(state=Result.ALMOST_DONE).count()
    mastered = results.filter(state=Result.MASTERED).count()

    all_flashcards = new_cards + still_learning + almost_done + mastered
    score = 0
    if all_flashcards > 0:
        score = int((still_learning / all_flashcards) * 25 + (almost_done / all_flashcards) * 75 + (mastered / all_flashcards) * 100)

    return render(request, "students/index.html", {"new_cards": new_cards, "still_learning": still_learning, "almost_done": almost_done, "mastered": mastered, "score": score})


@login_required
def multiple_choice(request):
    return render(request, "students/multiple_choice.html")


@login_required
def true_false(request):
    return render(request, "students/true_false.html")


@login_required
def writing(request):
    return render(request, "students/writing.html")


@login_required
def matching(request):
    return render(request, "students/matching.html")


@login_required
def get_flashcards(request):
    student = Student.objects.get(user=request.user)
    results = Result.objects.filter(student=student)
    results_list = []

    for result in results:
        flashcard = result.flashcard
        results_list.append({
            "flashcard__id": flashcard.id,
            "flashcard__front": flashcard.front,
            "flashcard__back": flashcard.back,
            "flashcard__image": default_storage.url(str(flashcard.image)),
            "state": result.state,
        })

    return JsonResponse({"flashcards": results_list})


@login_required
def update_results(request):
    student = Student.objects.get(user=request.user)

    if request.method == "POST":
        flashcards = json.loads(request.body).get("flashcards")

        for flashcard_data in flashcards:
            try:
                flashcard = Flashcard.objects.get(id=flashcard_data['flashcard__id'])
                result = Result.objects.get(student=student, flashcard=flashcard)
                result.state = flashcard_data['state']
                result.save()
            except Result.DoesNotExist:
                continue

    return JsonResponse({"message": "Results updated successfully."})
