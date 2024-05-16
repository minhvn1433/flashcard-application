from django.contrib import admin

from .models import Flashcard, Student, Teacher, Deck, Result

# Register your models here.
admin.site.register(Flashcard)
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Deck)
admin.site.register(Result)
