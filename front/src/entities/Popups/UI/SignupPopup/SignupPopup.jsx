import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './SignupPopup.module.css';
import { PopupFormRow } from 'widgets/PopupFormRow/PopupFormRow';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { Controller, useForm } from 'react-hook-form';
import { emailRegEx, fioRegEx, passwordRegEx } from 'shared/lib/regEx';
import { userApi } from 'entities/User/api/UserApi';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const SignupPopup = (props) => {
    const { className } = props;

    const {
        control, 
        handleSubmit, 
        formState: {errors}, 
        watch,
        setError,
        reset
    } = useForm({mode: 'onBlur'})
    const { role } = useSelector(state => state.user)
    const { result } = useSelector(state => state.testing)
    const { stage } = useSelector(state => state.tests)
    const [ registerUser ] = userApi.useRegisterUserMutation()

    const dispatch = useDispatch()

    // обработка отправки формы
    function SubmitHandler(data){
        const formData = data
        formData.role = role
        const percent = result.percent
        if(percent && percent === 100){
            formData.stages = [stage.id]
        }
        registerUser(formData)
            .then(res => {
                if (res.error?.data?.username){
                    setError(
                        'username',
                        {
                            type: 'api',
                            message: 'Такой логин уже занят.'
                        }
                    )
                }else {
                    reset()
                    dispatch(PopupsSlice.actions.showPopup(PopupNames.SIGNIN))
                }
            })
    }
    const password = watch('password', ''); // Получаем значение поля password
  

    const validatePasswordMatch = (value) => {
        if (value === password) {
          return true;
        }
        return 'Пароли должны совпадать';
      };

    return (
        <PopupBoard className={ClassNames(cls.signupPopup, {}, [className])}>
            <PopupNavigation />
            <h1 className={cls.title}>
                Регистрация
            </h1>
            <form onSubmit={handleSubmit(SubmitHandler)}>
                <Controller 
                    name='fio'
                    control={control}
                    rules={{
                        required: 'Пожулайста введите ФИО',
                        pattern: {
                            value: fioRegEx,
                            message: 'Пожалуйста введите корректные данные: Фамилия Имя'
                        }
                    }}
                    render={({field})=> <PopupFormRow label={"Имя"} error={errors.fio?.message} {...field} placeholder={'Иванов Иван'} className={cls.row} />}
                />
                <Controller 
                    name='username'
                    control={control}
                    rules={{
                        required: 'Пожулайста введите Логин'
                    }}
                    render={({field})=> <PopupFormRow label={"Логин"} error={errors.username?.message} {...field} placeholder={'ivanovIvan'} className={cls.row} />}
                />
                <Controller 
                    name='email'
                    control={control}
                    rules={{
                        required: 'Пожалуйста введите email',
                        pattern: {
                            value: emailRegEx,
                            message: 'Проверьте правильность введенной почты'
                        }
                    }}
                    render={({field})=> <PopupFormRow error={errors.email?.message ?? ''}  label={'Почта'} {...field} placeholder={'ivanov@mail.ru'} className={cls.row} />}
                />
                <Controller 
                    name='password'
                    rules={{
                        required: 'Пожалуйста введите пароль',
                        pattern: {
                            value: passwordRegEx,
                            message: "Пароль должен состоять как минимум из 8 латинских символов и включать как минимум одну заглавную букву, одну цифру и спец. символ. Пожалуйста, проверьте правильность введенного пароля."
                        }
                    }}
                    control={control}
                    render={({field})=> <PopupFormRow error={errors.password?.message ?? ''} type={'password'}  label={'Пароль'} {...field}  placeholder={'Ivanov11'} className={cls.row} />}
                />
                <Controller 
                    name='password2'
                    rules={{
                        required: 'Пожалуйста повторите пароль',
                        validate: validatePasswordMatch
                    }}
                    control={control}
                    render={({field})=> <PopupFormRow error={errors.password2?.message ?? ''} type={'password'} label={'Подтвердите пароль'} {...field} placeholder={'Ivanov11'} className={cls.row} />}
                />
                <Button type='submit' className={cls.button} theme={ButtonTheme.DARK} >Зарегистрироваться</Button>
            </form>
            <p className={cls.text}>
                    Уже есть аккаунт? <span className={cls.link} onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.SIGNIN))}>
                    Войти
                </span>
            </p>
        </PopupBoard>
 );
}