from django.contrib import admin
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget

from .models import Task, Test, Answer, Step

# Register your models here.
class StepAdminForm(forms.ModelForm):
    # Подключение виджета для поля теории при настройке этапов в админке
    theory = forms.CharField(label='Теоритическая информация', widget=CKEditorUploadingWidget())

    class Meta:
        model = Step
        fields= "__all__"


@admin.register(Step)
class StepAdmin(admin.ModelAdmin):
    # Подключение модели этапов к админке
    form = StepAdminForm

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    pass


@admin.register(Test)
class TestAdmin(admin.ModelAdmin):
    pass
