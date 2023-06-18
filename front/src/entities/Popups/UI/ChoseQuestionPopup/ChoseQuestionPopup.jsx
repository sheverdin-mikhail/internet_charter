import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ChoseQuestionPopup.module.css';
import { PopupWrapper } from 'widgets/PopupWrapper/PopupWrapper';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { useDispatch, useSelector } from 'react-redux';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { Button } from 'shared/UI/Button/Button';
import { TestCreationSlice, testCreationApi } from 'entities/TestCreation';
import { Loader } from 'shared/UI/Loader/Loader';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const ChoseQuestionPopup = (props) => {
    const { className } = props;

    const { activeTestCategory } = useSelector(state=>state.testCreation)
    const dispatch = useDispatch()
    const { data: tasks, isLoading } = testCreationApi.useGetAllQuestionsQuery({'stage': activeTestCategory})


    function addQuestionToListHandler(id){
        const task = tasks.find(task => task.id === id)

        dispatch(TestCreationSlice.actions.addQuestionToTasks(task))
        dispatch(PopupsSlice.actions.closePopup())
    }


    return (
        <PopupBoard className={ClassNames(cls.choseQuestionPopup, {}, [className])}>
            <PopupNavigation />
            <h2 className={'popupTitle'}>Выберите вопрос</h2>
            <div className={cls.cards}>
                {
                    isLoading
                    ?
                    <Loader/>
                    :
                    tasks.map(task => (
                        <div className={cls.card} key={`chooseQuestionPopupCard_${task.id}`}>
                            <span className={cls.question}>{task.question}</span>
                                <Button onClick={()=>addQuestionToListHandler(task.id)}>
                                Выбрать
                            </Button>
                        </div>
                    )) 

                }
            </div>
        </PopupBoard>        
 );
}