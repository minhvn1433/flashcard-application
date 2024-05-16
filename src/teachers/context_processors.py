from users.models import Teacher, Deck


def decks_processor(request):
    if request.user.is_authenticated and request.session.get("role") == "teacher":
        teacher = Teacher.objects.get(user=request.user)
        user_decks = Deck.objects.filter(teacher=teacher)
    else:
        teacher = None
        user_decks = Deck.objects.none()
    return {"user_decks": user_decks, "teacher": teacher}
