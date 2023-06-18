import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TestingTable.module.css';
import { ButtonTheme } from 'shared/UI/Button/Button';
import { questionTypes } from 'shared/models/TestModels';
import { TestingSlice, TestingTypes } from 'entities/Testing/redux/TestingSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SmallButton, SmallButtonTheme } from 'shared/UI/SmallButton/SmallButton';
import { CheckboxAnswers } from '../CheckboxAnswers/CheckboxAnswers';
import { RadioAnswers } from '../RadioAnswers/RadioAnswers';
import { TextAnswer } from '../TextAnswer/TextAnswer';

export const TestingTable = (props) => {
    const { 
        className
    } = props;

    const { test, activeTask, taskIndex, testingType } = useSelector(state => state.testing)

    const dispatch = useDispatch()

    function ClickNextHandler(){
        if(testingType !== TestingTypes.RESULTS){
            dispatch(TestingSlice.actions.saveAnswers())
        }
        dispatch(TestingSlice.actions.nextTask())
    }
    
    function ClickPrevHandler(){
        if(testingType !== TestingTypes.RESULTS){
            dispatch(TestingSlice.actions.saveAnswers())

        }
        dispatch(TestingSlice.actions.prevTask())
    }

    return (
        <div className={ClassNames(cls.testingTable, {}, [className])}>
            <h2 className={cls.title}>{taskIndex+1} Вопрос</h2>
            <h2 className={cls.title}>{activeTask?.question}</h2>
            <div className={cls.answers}>
                {
                    activeTask?.type === questionTypes.CHECKBOX
                    ?
                    <CheckboxAnswers answers={activeTask.answers} isResults={testingType === TestingTypes.RESULTS || testingType === TestingTypes.ONE_TASK_VIEW}/>
                    :
                    activeTask?.type === questionTypes.RADIO
                    ?
                    <RadioAnswers answers={activeTask?.answers} isResults={testingType === TestingTypes.RESULTS || testingType === TestingTypes.ONE_TASK_VIEW}/>
                    :
                    activeTask?.type === questionTypes.TEXT
                    ?
                    <TextAnswer answers={activeTask?.answers} isResults={testingType === TestingTypes.RESULTS || testingType === TestingTypes.ONE_TASK_VIEW}/>
                    :
                    null
                }
            </div>
            {
                testingType !== TestingTypes.ONE_TASK_VIEW
                ?
                <div className={cls.buttons}>
                    <SmallButton 
                        disabled={taskIndex === 0} 
                        theme={SmallButtonTheme.DARK} 
                        className={cls.button} 
                        onClick={ClickPrevHandler}
                    >
                        Назад
                    </SmallButton>
                    <SmallButton 
                        disabled={taskIndex === test?.tasks?.length - 1} 
                        theme={ButtonTheme.DARK} 
                        className={cls.button} 
                        onClick={ClickNextHandler}
                    >
                        Дальше
                    </SmallButton>
                </div>
                :
                null
            }
        </div>
 );
}