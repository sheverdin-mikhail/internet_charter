import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AddClassPopup.module.css';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { InputTheme } from 'shared/UI/Input/Input';
import { classesApi } from 'entities/Classes';
import { Controller, useForm } from 'react-hook-form';
import { PopupFormRow } from 'widgets/PopupFormRow/PopupFormRow';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const AddClassPopup = (props) => {
    const { className } = props;

    const dispatch = useDispatch()
    const [ saveClassRoom ] = classesApi.useSaveClassRoomMutation()

    const {
        control, 
        handleSubmit, 
        formState: {errors}, 
        reset
    } = useForm({mode: 'onBlur'})

    function saveHandler(data) {
        saveClassRoom(data)
        dispatch(PopupsSlice.actions.closePopup())
        reset()
    }



    return (
        <div className={ClassNames(cls.addClassPopup, {}, [className])}>
            <PopupNavigation />
            <h2 className={cls.title}>Введите название класса:</h2>
            <form onSubmit={handleSubmit(saveHandler)} className={cls.form}>
                <Controller 
                    name='class_name'
                    control={control}
                    rules={{
                        required: 'Пожулайста введите название класса'
                    }}
                    render={
                        ({field})=> <PopupFormRow 
                            { ...field }
                            theme={InputTheme.CLEAR} 
                            error={errors.class_name?.message}
                            placeholder={'5 А'} 
                            className={cls.input} 
                            />
                        }
                />
                <Button className={cls.button} theme={ButtonTheme.DARK} >Сохранить</Button>
            </form>
        </div>
 );
}