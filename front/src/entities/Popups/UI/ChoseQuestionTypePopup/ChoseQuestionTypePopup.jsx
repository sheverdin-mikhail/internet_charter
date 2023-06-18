import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ChoseQuestionTypePopup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { Button } from 'shared/UI/Button/Button';
import { TestCreationSlice, testCreationApi } from 'entities/TestCreation';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const ChoseQuestionTypePopup = (props) => {
    const { className } = props;

    const dispatch = useDispatch()

        
    const [ getQuestion ] = testCreationApi.useGetQuestionMutation()
    const { tasks } = useSelector(state => state.testCreation)
 

    function addRandomQuestionHandler() {
        // dispatch(TestCreationSlice.actions.addRandomQuestion())
        getQuestion({random: true, tasks_id: [tasks.map(task => (task.id))]}).then(res => {
            if (res.data){
                dispatch(TestCreationSlice.actions.addQuestionToTasks(res.data))
            }
            if(res.error){
            }
            dispatch(PopupsSlice.actions.closePopup())
        })

    }

    function openChoseTestCategoryPopup(){
        dispatch(PopupsSlice.actions.closePopup())
        dispatch(PopupsSlice.actions.showPopup(PopupNames.CHOSE_TEST_CATEGORY))
    }  
    function openQuestionConstructorPopup(){
        dispatch(PopupsSlice.actions.closePopup())
        dispatch(PopupsSlice.actions.showPopup(PopupNames.QUESTION_CONSTRUCTOR))
    }  


    return (
        <PopupBoard className={ClassNames(cls.choseQuestionTypePopup, {}, [className])}>
            <PopupNavigation />
            <h2 className={cls.title}>Какой тип вопроса вы хотите добавить?</h2>
            <Button className={cls.button} onClick={()=>addRandomQuestionHandler()} >Добавить случайный вопрос</Button>
            <Button className={cls.button} onClick={()=>openChoseTestCategoryPopup()} >Выбрать вопрос из списка</Button>
            <Button className={cls.button} onClick={()=>openQuestionConstructorPopup()} >Создать свой собственный вопрос</Button>
        </PopupBoard>
 );
}