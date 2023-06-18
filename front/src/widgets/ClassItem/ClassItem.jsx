import React, { useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ClassItem.module.css';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { ReactComponent as Arrow} from 'shared/assets/icons/arrow-top.svg'
import { useDispatch } from 'react-redux';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import {ReactComponent as Edit} from 'shared/assets/icons/edit-icon.svg'
import {ReactComponent as Cross} from 'shared/assets/icons/cross-icon.svg'
import { ClassesSlice } from 'entities/Classes/redux/ClassesSlice';
import { classesApi } from 'entities/Classes';

export const ClassItem = (props) => {
    const { 
        className,
        item
    } = props;


    const [active, setActive ] = useState()
    const [ deleteClassRoom ] = classesApi.useDeleteClassRoomMutation()


    const dispatch = useDispatch()
    const [ deleteStudent ] = classesApi.useDeleteStudentMutation()


    function toggleActive(){
        setActive(prev => !prev)
    }

    function openPopuptHandler(class_id){
        dispatch(ClassesSlice.actions.setEditionalClass(class_id))
        dispatch(PopupsSlice.actions.showPopup(PopupNames.ADD_STUDENT))
    }

    function deleteStudentHandler(data){
        deleteStudent(data)
    }
    
    


    function editHandler(item){
        dispatch(ClassesSlice.actions.setEditionalClass(item.class))
        dispatch(ClassesSlice.actions.setEditionalStudent(item.student))
        dispatch(PopupsSlice.actions.showPopup(PopupNames.ADD_STUDENT))
    }

    function deleteClassHandler(class_id){
        deleteClassRoom(class_id)
    }

    return (
        <div className={ClassNames(cls.classItem, {}, [className])}>
            <span 
                className={ClassNames(cls.title, {[cls.active]: active}, [])} 
                onClick={()=>toggleActive()} 
            >{item.name}  <Arrow className={ClassNames(cls.icon, {[cls.active]: active}, [])} /> </span>
            <div className={ClassNames(cls.body, {[cls.active]: active}, [])}>
                {
                    item.students.map(student => (
                        <div className={cls.row} key={`classItemStuddent_${student.id}`} >
                            <div className={cls.information}>
                                <span className={cls.fio}>{student.fio}</span> 
                                <span className={cls.login}>Логин: {student.login}</span> 
                                <span className={cls.password}>Пароль: {student.password}</span> 
                            </div>
                            <div className={cls.controlls}>
                                <Edit className={cls.icon} onClick={()=>editHandler({
                                    class: item.id, 
                                    student: student.id
                                })} />
                                <Cross className={cls.icon} onClick={()=>deleteStudentHandler({
                                    student: student.id
                                })} />
                            </div>
                        </div> 
                    ))
                }
                <div className={cls.buttons} >
                    <Button
                        className={cls.button} 
                        theme={ButtonTheme.DARK}
                        onClick={()=>openPopuptHandler(item.id)} 
                    >Добавить ученика</Button>
                    <Button
                        className={ClassNames(cls.button, {}, [])} 
                        theme={ButtonTheme.DARK}
                        onClick={()=>deleteClassHandler(item.id)} 
                    >Удалить класс</Button>
                </div>
            </div>
        </div>
 );
}