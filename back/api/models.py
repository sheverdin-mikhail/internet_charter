from django.db import models
from django.contrib.auth.models import AbstractUser  
from django.contrib.auth.validators import UnicodeUsernameValidator


class CustomUser(AbstractUser):
    

    username_validator = UnicodeUsernameValidator
    username = models.CharField(
        ('username'),
        max_length=150,
        blank=True,
        null=True,
        help_text=('Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': ("A user with that username already exists."),
        },
    )
    email = models.EmailField(
        ('email address'),
        unique=True,
    )
    email_verify = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']




class Answer(models.Model):
    #Модель ответов для теста

    class Meta:
        verbose_name = "Ответ"
        verbose_name_plural = "Ответы"

    def __str__(self):
        return self.answer

    answer = models.CharField(("Текст ответа"), max_length=255)


class Task(models.Model):
    #Модель задания в тесте

    class Meta:
        verbose_name = "Задание"
        verbose_name_plural = "Задания"

    def __str__(self):
        return self.question

    RADIO = 'radio'
    CHECKBOX = 'checkbox'
    TEXT = 'text'
    TYPES = [
        (RADIO, "радиобаттоны"),
        (CHECKBOX, "чекбоксы"),
        (TEXT, "текстовый"),
    ]

    type = models.CharField(("Тип задания"), max_length=50, choices=TYPES, default=RADIO)
    question = models.CharField("текст вопроса задания", max_length=255)
    correct_answer = models.ManyToManyField("api.Answer", verbose_name=("Правильный(е) ответ(ы)"), related_name='correct_answer')
    options_answer = models.ManyToManyField("api.Answer", verbose_name=("Варианты ответов"), null=True, blank=True, related_name='options_answer')



class Test(models.Model):
    #Модель теста

    class Meta:
        verbose_name = "Тест"
        verbose_name_plural = "Тесты"

    def __str__(self):
        return self.name

    name = models.CharField(("Название теста"), max_length=50)
    description = models.CharField(("Описание теста"), max_length=255, blank=True, null=True)
    tasks = models.ManyToManyField("api.Task", verbose_name=("Задания для теста"), related_name='tasks')



class Step(models.Model):
    #Модель этапа испытаний

    class Meta:
        verbose_name = "Этап"
        verbose_name_plural = "Этапы"

    def __str__(self):
        return self.name

    name = models.CharField(("Название этапа"), max_length=50)
    description = models.CharField(("Описание этапа"), max_length=255, blank=True, null=True)
    theory = models.TextField(("Теория этапа"))
    test = models.ForeignKey("api.Test", verbose_name=("Тест"), on_delete=models.CASCADE)


