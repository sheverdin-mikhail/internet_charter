from django.db import models
from django.utils import timezone
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    USER_ROLES = (
        ('teacher', 'Учитель'),
        ('student', 'Ученик'),
        ('user', 'Пользователь'),
    )

    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, verbose_name='Аватар')
    role = models.CharField(choices=USER_ROLES, default='user', max_length=100, verbose_name='Роль пользователя')
    teacher = models.OneToOneField('Teacher', null=True, blank=True, on_delete=models.CASCADE, related_name='teacher_profile')
    student = models.OneToOneField('Student', null=True, blank=True, on_delete=models.CASCADE, related_name='student_profile')
    user = models.OneToOneField('UserStage', null=True, blank=True, on_delete=models.CASCADE, related_name='user_profile')
    email_confirmed = models.BooleanField(("Почта подтверждена"), default=False)

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

    def __str__(self):
        return f'{self.username}'



class UserStage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stages_passed = models.ManyToManyField('Stage', related_name='passed_users', blank=True, verbose_name='Этапы пройденные')
    stages_not_passed = models.ManyToManyField('Stage', related_name='not_passed_users', blank=True, verbose_name='Этапы не пройденные')
    certificate = models.BooleanField(default=False, verbose_name='Сертификат')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Пройденные этапы пользователя'
        verbose_name_plural = 'Пройденные этапы пользователей'

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'


class Teacher(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь', related_name='teacher_profile')
    classes = models.ManyToManyField('Class', related_name='teachers', blank=True, verbose_name='Классы')
    custom_tests = models.ManyToManyField('Test', related_name='created_by', blank=True, verbose_name='Кастомные тесты, созданные учителем')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Учитель'
        verbose_name_plural = 'Учителя'

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='Пользователь', related_name='student_profile')
    username = models.CharField(max_length=100, verbose_name='Логин')
    password = models.CharField(max_length=255, verbose_name='Пароль')
    classroom = models.ForeignKey('Class', on_delete=models.CASCADE, related_name='students', verbose_name='Класс')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Ученик'
        verbose_name_plural = 'Ученики'

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

class Class(models.Model):
    class_name = models.CharField(max_length=100, verbose_name='Название класса')
    tests = models.ManyToManyField("Test", verbose_name="Доступные тесты", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Класс'
        verbose_name_plural = 'Классы'

    def __str__(self):
        return self.class_name

class Stage(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название этапа')
    description = models.TextField(verbose_name='Краткое описание')
    image = models.ImageField(upload_to='stages/', null=True, blank=True, verbose_name='Картинка/Иконка')
    order = models.IntegerField(verbose_name='Порядковый номер этапа')
    information = models.TextField(null=True, blank=True, verbose_name='Информация')
    test = models.ForeignKey('Test', on_delete=models.CASCADE, verbose_name='Тест')
    allow_unauthenticated = models.BooleanField(verbose_name='Доступ без авторизации')

    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Этап'
        verbose_name_plural = 'Этапы'

    def __str__(self):
        return self.title
    


class Task(models.Model):
    QUESTION_TYPES = (
        ('single_choice', 'Одиночный выбор'),
        ('multiple_choice', 'Множественный выбор'),
        ('free_text', 'Свободный текст'),
    )

    question_type = models.CharField(choices=QUESTION_TYPES, max_length=100, verbose_name='Тип вопроса')
    question_text = models.TextField(verbose_name='Текст вопроса')
    correct_answers = models.ManyToManyField('Answer', related_name='tasks_correct', verbose_name='Правильные ответы')
    possible_answers = models.ManyToManyField('Answer', related_name='tasks_possible', verbose_name='Возможные ответы')
    creator = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name='Создатель', blank=True, null=True)
    is_custom = models.BooleanField(("Кастомный"), default=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Задание'
        verbose_name_plural = 'Задания'

    def __str__(self):
        return self.question_text
    


class Test(models.Model):
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(verbose_name='Описание', blank=True, null=True)
    tasks = models.ManyToManyField(Task, related_name='custom_tests', blank=True, verbose_name='Задачи')
    creator = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name='Создатель', blank=True, null=True)
    is_custom = models.BooleanField(("Кастомный"), default=True)
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата изменения')

    class Meta:
        verbose_name = 'Тест'
        verbose_name_plural = 'Тесты'

    def __str__(self):
        return f'Тест {self.name}'


class Answer(models.Model):
    text = models.TextField(verbose_name='Текст ответа')
    creator = models.ForeignKey(Teacher, on_delete=models.CASCADE, verbose_name='Создатель', blank=True, null=True)
    is_custom = models.BooleanField(("Кастомный"), default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Ответ'
        verbose_name_plural = 'Ответы'
        
    def __str__(self):
        return f'Ответ: {self.text}'


class TestResult(models.Model):
    student = models.ForeignKey('Student', on_delete=models.CASCADE, verbose_name='Ученик')
    test = models.ForeignKey('Test', on_delete=models.CASCADE, verbose_name='Тест')
    correct_answers_count = models.IntegerField(verbose_name='Кол-во правильно отвеченных вопросов')
    total_answers_count = models.IntegerField(verbose_name='Общее число вопросов')
    percent_correct = models.IntegerField(verbose_name='Процент правильных ответов к общему числу ответов')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        verbose_name = 'Результат прохождения теста'
        verbose_name_plural = 'Результаты прохождения тестов'
        