import React, { useEffect, useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ProfileForm.module.css';
import { FormInputRow } from 'widgets/FormInputRow/FormInputRow';
import { Button } from 'shared/UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { emailRegEx } from 'shared/lib/regEx';
import { UserSlice, userApi } from 'entities/User';

export const ProfileForm = (props) => {
    const { className, rabbitView=true } = props;
    const { firstName, secondName, email, access_token } = useSelector(state => state.user)
    const [ formDisabled, setFormDisabled ] = useState(true)    
    const [ saveUser ] = userApi.useSaveUserMutation()
    const dispatch = useDispatch()


    const {
        control, 
        handleSubmit, 
        formState: { dirtyFields}, 
        reset,
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            first_name: firstName,
            last_name: secondName,
            email: email
        }
    })

    function SubmitHandler(data){
        setFormDisabled(true)
        saveUser({formData: data, token: access_token}).then(res => {
            if (res.data){
                reset({first_name: data.first_name, last_name: data.last_name, email: data.email})
                dispatch(UserSlice.actions.setFio({first_name: data.first_name, last_name: data.last_name}))
            }
        })
    }

    const [ fetchUser ] = userApi.useFetchUserDetailMutation()



    useEffect(()=>{
        fetchUser(access_token)
            .then(res => 
                reset({first_name: res.data?.first_name, last_name: res.data?.last_name, email: res.data?.email})
                )
        
    },[firstName])
    



    return (
        <form className={ClassNames(cls.ProfileForm, {[cls.rabbitView]: rabbitView}, [className])} onSubmit={handleSubmit(SubmitHandler)}>

            <Controller 
                name='first_name'
                control={control}
                defaultValue={firstName }
                render={({field})=>  <FormInputRow 
                { ...field }
                    theme={'border'} 
                    id={'firstname'} 
                    placeholder='Иван' 
                    label='Имя:' 
                    className={cls.row} 
                    disabled={formDisabled}
                />}
            />

            <Controller 
                name='last_name'
                defaultValue={secondName}
                control={control}
                rules={{
                    required: 'Пожулайста введите имя'
                }}
                render={({field})=> <FormInputRow 
                    { ...field }
                    theme={'border'} 
                    id={'secondname'} 
                    placeholder='Иванов' 
                    label='Фамилия:' 
                    className={cls.row} 
                    disabled={formDisabled}
                />}
            />
           
           
            <Controller 
                name='email'
                control={control}
                defaultValue={email}
                rules={{
                    pattern: {
                        value: emailRegEx,
                        message: 'Проверьте правильность введенной почты'
                    }
                }}
                render={({field})=> <FormInputRow 
                    { ...field }
                    theme={'border'} 
                    id={'email'} 
                    placeholder='email@mail.ru' 
                    label='Почта:' 
                    className={cls.row} 
                    disabled={true}
                />}
            />
            {
                formDisabled 
                ?
                    <Button type={'button'} className={cls.button} onClick={e=>{
                        e.preventDefault()
                        setFormDisabled(false)}
                    } >Изменить данные</Button>
                :
                    dirtyFields.first_name || dirtyFields.last_name
                    ?
                    <Button className={cls.button}  >Сохранить</Button>
                    :
                    <Button className={cls.button} onClick={()=>setFormDisabled(true)}  >Отмена</Button>

            }
        </form>
 );
}