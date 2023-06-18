import React, { useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TestingStudentResultPopup.module.css';
import { SmallButton, SmallButtonTheme } from 'shared/UI/SmallButton/SmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { testResultApi } from 'entities/TestResult';
import { TestingSlice } from 'entities/Testing';
import { useNavigate } from 'react-router';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const TestingStudentResultPopup = (props) => {
    const { className } = props;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { result } = useSelector(state => state.testing)
    const  [ isShowResults, setIsShowResults ] = useState(false)

    const [ sendResults] = testResultApi.useSendResultsMutation()

    function CloseHandler(){
        sendResults(result).then(() => {
            if(isShowResults){
                dispatch(TestingSlice.actions.clearTesting())
            }
        })
    }

    function ClickFinishHandler(){
        navigate('/account/tests')
        dispatch(PopupsSlice.actions.closePopup())
    }

    function ShowResultsHandler(){
        setIsShowResults(true)
        dispatch(TestingSlice.actions.showResults())
        dispatch(PopupsSlice.actions.closePopup())
    }

    return (
        <PopupBoard closeHandler={CloseHandler} className={ClassNames(cls.testResultPopup, {}, [className])}>
            <PopupNavigation />
            <h2 className={cls.title}>Поздравляем!</h2>
            <p className={cls.text}>Ты прошёл тест на {result?.correctAnweredQuestions}/{result?.totalQuestions}</p>
            <SmallButton 
                theme={SmallButtonTheme.DARK} 
                className={cls.button}
                onClick={()=>ClickFinishHandler()}
            >
                Завершить
            </SmallButton>
            <SmallButton 
                theme={SmallButtonTheme.DARK} 
                className={cls.button}
                onClick={()=>ShowResultsHandler()}
            >
                Просмотреть результат
            </SmallButton>
        </PopupBoard>
 );
}