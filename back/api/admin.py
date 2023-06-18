from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import User, UserStage, Teacher, Student, Class, Stage, Task, Test, Answer, TestResult



# Регистрация модели User
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'role']


# Регистрация модели UserStage
@admin.register(UserStage)
class UserStageAdmin(admin.ModelAdmin):
    list_display = ['user']

# Регистрация модели Teacher
@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['user']
    

# Регистрация модели Student
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'username', 'classroom']
    

# Регистрация модели Class
@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = ('id', 'class_name', 'teacher_name', 'created_at', 'updated_at')

    def teacher_name(self, obj):
        return ', '.join([f'login: {teacher.user.username}, ФИО: {teacher.user.get_full_name()}' for teacher in obj.teachers.all()])
    teacher_name.short_description = 'Учитель'
    

# Register your models here.
class StageAdminForm(forms.ModelForm):
    # Подключение виджета для поля теории при настройке этапов в админке
    information = forms.CharField(label='Теоритическая информация', widget=CKEditorUploadingWidget())

    class Meta:
        model = Stage
        fields= "__all__"


# Регистрация модели Stage
@admin.register(Stage)
class StageAdmin(admin.ModelAdmin):
    list_display = ['title', 'order']
    form=StageAdminForm
    

# Регистрация модели Task
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['question_type', 'question_text', 'creator']
    

# Регистрация модели Test
@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    list_display = ['name', 'creator']
    

# Регистрация модели Answer
@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ['text', 'creator']
    

# Регистрация модели TestResult
@admin.register(TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ['student', 'test', 'correct_answers_count', 'total_answers_count']
    