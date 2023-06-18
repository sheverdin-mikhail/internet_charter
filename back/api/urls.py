from django.urls import path, include
from . import views

urlpatterns = [
    path('user/activation/<uidb64>/<token>/',  views.UserActivationView.as_view(), name='verify_email_confirm'), #Активация email
    path('user/',  views.UserView.as_view()), #Получение данных пользователя
    path('user/create/',  views.UserRegistrationView.as_view()), #Регистрация нового пользователя
    path('classes/',  views.ClassListView.as_view()),
    path('classes/create/',  views.ClassCreateView.as_view()),
    path('classes/delete/',  views.ClassDeleteView.as_view()),
    path('classes/student/',  views.StudentView.as_view()),
    path('tests/',  views.TestsView.as_view()),
    path('test/open-access',  views.OpenAccessForStudent.as_view()),
    path('task/',  views.TaskView.as_view()),
    path('tasks/',  views.TasksView.as_view()),
    path('stages/',  views.StagesView.as_view()),
    path('stages/completed/',  views.CompletedStagesView.as_view()),
    path('stages/result/',  views.StageResult.as_view()),
    path('results/',  views.TestResultView.as_view()),

]
