import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AddStudentPopup.module.css';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { ClassesSlice, classesApi } from 'entities/Classes';
import { Controller, useForm } from 'react-hook-form';
import { PopupFormRow } from 'widgets/PopupFormRow/PopupFormRow';
import { fioRegEx } from 'shared/lib/regEx';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';

export const AddStudentPopup = (props) => {
    const { className } = props;

    const { editionalClass, editionalStudent, classes } = useSelector(state=>state.classes)
    const dispatch = useDispatch()


    const {
        control, 
        handleSubmit, 
        formState: {errors}, 
        reset
    } = useForm({mode: 'onBlur'})

    const [ editStudent ] = classesApi.useEditStudentMutation()
    const [ createStudent ] = classesApi.useCreateStudentMutation()

    function saveHandler(data) {
        // Проверка: изменение ученика или создание нового
        if(Boolean(editionalClass) && Boolean(editionalStudent) ){ 
            //Изменение
            editStudent({
                classroom: {
                    id: editionalClass
                },
                student: editionalStudent,
                fio: data.fio,
            })
            dispatch(PopupsSlice.actions.closePopup())
            reset()
        }else{
            //Создание нового
            createStudent({
                fio: data.fio,
                classroom: {
                    id: editionalClass
                }
            })
            dispatch(PopupsSlice.actions.closePopup())
            reset()
        }
    }

    function closePopupHandler(){
        dispatch(ClassesSlice.actions.removeEditionalClass())
        dispatch(ClassesSlice.actions.removeEditionalSudent())
        dispatch(PopupsSlice.actions.closePopup())
        reset()
    }


    return (
        <PopupBoard closeHandler={closePopupHandler}  className={ClassNames(cls.addClassPopup, {}, [className])}>
            <PopupNavigation handler={closePopupHandler} />
            <h2 className={cls.title}>Введите данные ученика:</h2>
            <form onSubmit={handleSubmit(saveHandler)} className={cls.form}>
                <Controller 
                name='fio'
                control={control}
                rules={{
                    required: 'Пожулайста введите фио ученика',
                    pattern: {
                        value: fioRegEx,
                        message: 'Пожалуйста введите корректные данные: Фамилия Имя'
                    }
                }}
                defaultValue={
                    editionalStudent.length !== 0
                    ?classes
                        .find(item => editionalClass === item.id).students
                        .find(student => editionalStudent === student.id).fio
                    : ''
                }
                render={ ({field}) => 
                    <PopupFormRow 
                    {...field}
                    className={cls.input} 
                    error={errors.fio?.message ?? ''}
                    placeholder={'Иванов Иван'} 
                />
                } />
                <Button className={cls.button} theme={ButtonTheme.DARK} >Сохранить</Button>
            </form>
        </PopupBoard>
 );
}