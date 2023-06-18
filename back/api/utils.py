import random
import string

def generate_random_username(length=8):
    chars = string.ascii_lowercase + string.digits
    return ''.join(random.choice(chars) for _ in range(length))

def generate_random_password(length=8):
    uppercase_letters = string.ascii_uppercase
    lowercase_letters = string.ascii_lowercase
    digits = string.digits
    special_characters = '!@#$%^&*[]{}().-_'

    # Составляем список всех доступных символов
    all_characters = uppercase_letters + lowercase_letters + digits + special_characters

    # Генерируем пароль
    password = random.choice(uppercase_letters)  # Минимум одна заглавная буква
    password += random.choice(lowercase_letters)  # Минимум одна строчная буква
    password += random.choice(digits)  # Минимум одна цифра
    password += random.choice(special_characters)  # Минимум один специальный символ

    # Добавляем остальные символы, чтобы достичь заданной длины
    password += ''.join(random.choice(all_characters) for _ in range(length - 4))

    # Перемешиваем символы в пароле
    password = ''.join(random.sample(password, len(password)))

    return password
               
    

def split_fio(fio):

        first_name = fio.split(' ', 1)[1]
        last_name = fio.split(' ', 1)[0]
        return {
            'first_name': first_name,
            'last_name': last_name
        }