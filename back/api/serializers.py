from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from rest_framework import serializers
from .models import (
    User, 
    Teacher, 
    Student, 
    UserStage, 
    Stage, 
    Class, 
    Test, 
    Task, 
    Answer, 
    TestResult
)







    

class UserStageSerializer(serializers.ModelSerializer):


    class Meta:
        model = UserStage
        fields = ['certificate']


class UserDetailSerializer(serializers.ModelSerializer):

    user = UserStageSerializer(many=False, read_only=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'avatar', 'email', 'role', 'user')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'username', 'password', 'role', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        if validated_data['role'] == 'teacher' or validated_data['role'] == 'user':
            user.email_confirmed = False  # Устанавливаем флаг is_active в False для активации почты
            self.send_activation_email(user)  # Отправляем письмо для активации почты
        user.save()
        return user

    def send_activation_email(self, user):
        current_site = get_current_site(self.context.get('request'))
        mail_subject = 'Активация учетной записи'
        message = render_to_string('api/activation_email.html', {
            'user': user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': default_token_generator.make_token(user),
        })
        to_email = user.email
        email = EmailMessage(mail_subject, message, to=[to_email])
        email.send()





class StudentSerializer(serializers.ModelSerializer):
    fio = serializers.SerializerMethodField()
    login = serializers.CharField(source='username')

    def get_fio(self, student):
        return student.user.first_name + ' ' + student.user.last_name

    class Meta: 
        model = Student
        fields = ('id', 'fio', 'login', 'password')


class ClassSerializer(serializers.ModelSerializer):
    students = StudentSerializer(many=True, read_only=True)
    name = serializers.CharField(source='class_name')

    class Meta:
        model = Class
        fields = ('id', 'name', 'students')


class TeacherClassesSerializer(serializers.ModelSerializer):

    classes = ClassSerializer(many=True, read_only=True, required=False)

    class Meta: 
        model = Teacher
        fields = ('id', 'classes')


class ClassCreateSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Class
        fields = ['class_name']

class ClassDeleteSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Class
        fields = ['id']


class TeacherSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Teacher
        fields = '__all__'




class AnswerSerializer(serializers.ModelSerializer):

    class Meta: 
        model = Answer
        fields = ('id', 'text', 'is_custom', 'creator')


class TaskSerializer(serializers.ModelSerializer):

    type = serializers.CharField(source='question_type')
    question = serializers.CharField(source='question_text')
    isPersonal = serializers.BooleanField(source='is_custom')
    answers = serializers.SerializerMethodField()

    def get_answers(self, task):

        answers = []
        for answer in task.possible_answers.all().order_by('?'):
            answers.append({
                "id": answer.id,
                "text": answer.text,
                "isCorrect": bool(task.correct_answers.filter(id=answer.id))
            })
    
        return answers

    

    class Meta: 
        model = Task
        fields = ('id', 'answers', 'type', 'question', 'isPersonal', 'creator' )


class TestsSerializer(serializers.ModelSerializer):

    id = serializers.IntegerField(read_only=False)
    
    tasks = TaskSerializer(read_only=True, many=True)
    title = serializers.CharField(source='name')

    class Meta: 
        model = Test
        fields = ['id', 'tasks', 'title', 'description', 'creator']


class ClassesForAccessSerializer(serializers.ModelSerializer):


    tests = TestsSerializer(many=True)
    

    class Meta: 
        model = Class
        fields = '__all__'



class TestResultSerializer(serializers.ModelSerializer):


    test = TestsSerializer(read_only=False)
    
    class Meta: 
        model = TestResult
        fields = '__all__'


    def create(self, validated_data):
        test_data = validated_data.pop('test')
        test = Test.objects.get(id=test_data['id'])
        
        test_result = TestResult.objects.create(test=test, **validated_data)
        
        return test_result


class TeacherTestResultSerializer(serializers.ModelSerializer):


    test = TestsSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    
    class Meta: 
        model = TestResult
        fields = '__all__'


class StageSerializer(serializers.ModelSerializer):

    test = TestsSerializer(read_only=True, many=False)
    


    class Meta:
        model = Stage
        fields = ('id', 'title', 'information', 'description', 'test', 'allow_unauthenticated', 'image')