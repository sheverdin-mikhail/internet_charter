import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TeacherContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { NotFoundResults } from '../NotFoundResults/NotFoundResults';
import { Button } from 'shared/UI/Button/Button';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { ClassList } from 'widgets/ClassList/ClassList';
import { classesApi } from 'entities/Classes';
import { Loader } from 'shared/UI/Loader/Loader';

export const TeacherContent = (props) => {
    const { className } = props;

    const dispatch = useDispatch()

    const [fetchClassRooms, {data, isLoading}] = classesApi.useLazyFetchClassRoomsQuery()

    useEffect(()=>{fetchClassRooms(null)}, [])

   
    return (
        <div className={ClassNames(cls.teacherContent, {}, [className])}>
            
            {
                isLoading
                ?
                    <Loader />
                :
                    data && data[0].classes.length > 0
                    ?
                    <>
                        <h2 className={cls.title}>Мои классы:</h2>
                        <ClassList classes={data[0].classes} />
                        <Button className={cls.button} onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.ADD_CLASS))} >Добавить класс</Button>
                        
                    </>
                    :
                    <NotFoundResults title={'Мои классы:'} description={'Вы еще не добавили ни одного класса'} >
                        <Button onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.ADD_CLASS))} >Добавить класс</Button>
                    </NotFoundResults>
            }
        </div>
 );
}