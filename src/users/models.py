from django.contrib.auth.models import User
from django.db import models


# Create your models here.
class Flashcard(models.Model):
    front = models.TextField()
    back = models.TextField()
    image = models.ImageField(upload_to="flashcards/", null=True, blank=True)

    def __str__(self):
        return f"{self.front} | {self.back}"


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    students = models.ManyToManyField(Student, blank=True, related_name="teachers")
    flashcards = models.ManyToManyField(Flashcard, blank=True)

    def __str__(self):
        return self.user.username

    def add_flashcard(self, flashcard):
        self.flashcards.add(flashcard)
        self.save()

        for student in self.students.all():
            if not Result.objects.filter(student=student, flashcard=flashcard).exists():
                Result.objects.create(student=student, flashcard=flashcard)

    def remove_flashcard(self, flashcard):
        self.flashcards.remove(flashcard)
        self.save()

        for student in self.students.all():
            other_teachers = student.teachers.exclude(id=self.id)
            other_teachers_flashcards = Flashcard.objects.filter(
                teacher__in=other_teachers
            )
            if flashcard not in other_teachers_flashcards:
                Result.objects.filter(student=student, flashcard=flashcard).delete()

    def add_student(self, student):
        self.students.add(student)
        self.save()

        for flashcard in self.flashcards.all():
            if not Result.objects.filter(student=student, flashcard=flashcard).exists():
                Result.objects.create(student=student, flashcard=flashcard)

    def remove_student(self, student):
        self.students.remove(student)
        self.save()

        other_teachers = student.teachers.exclude(id=self.id)
        other_teachers_flashcards = Flashcard.objects.filter(teacher__in=other_teachers)
        for flashcard in self.flashcards.all():
            if flashcard not in other_teachers_flashcards:
                Result.objects.filter(student=student, flashcard=flashcard).delete()


class Deck(models.Model):
    name = models.CharField(max_length=64)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="decks")
    flashcards = models.ManyToManyField(Flashcard, blank=True)

    def __str__(self):
        return self.name

    def add_flashcard(self, flashcard):
        self.flashcards.add(flashcard)
        self.save()

    def remove_flashcard(self, flashcard):
        self.flashcards.remove(flashcard)
        self.save()


class Result(models.Model):
    NEW_CARDS = "New Cards"
    STILL_LEARNING = "Still Learning"
    ALMOST_DONE = "Almost Done"
    MASTERED = "Mastered"

    STATE_CHOICES = [
        (NEW_CARDS, "New Cards"),
        (STILL_LEARNING, "Still Learning"),
        (ALMOST_DONE, "Almost Done"),
        (MASTERED, "Mastered"),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    flashcard = models.ForeignKey(Flashcard, on_delete=models.CASCADE)
    state = models.CharField(
        max_length=20,
        choices=STATE_CHOICES,
        default=NEW_CARDS,
    )
