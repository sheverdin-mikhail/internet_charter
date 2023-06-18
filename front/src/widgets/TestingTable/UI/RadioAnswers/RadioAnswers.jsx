import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './RadioAnswers.module.css';
import { RadioButton } from 'shared/UI/RadioButton/RadioButton';
import { TestingSlice } from 'entities/Testing';
import { useDispatch } from 'react-redux';

export const RadioAnswers = (props) => {
    const { 
        className,
        answers,
        isResults=false
    } = props;

    const dispatch = useDispatch()



    return (
        <div className={ClassNames(cls.radioAnswers, {}, [className])}>
            {
                answers.map((answer, index) => (
                    <RadioButton 
                        text={answer.text} 
                        id={`answer_${index}`} 
                        name='answer'  
                        key={`checkboxAnswerItem_${index}`} 
                        className={ClassNames(cls.row, {}, [])}
                        isCorrect = {answer.isCorrect === true && isResults}
                        isWrong = {answer.value === true && answer.isCorrect === false && isResults}
                        onChange={()=>{dispatch(TestingSlice.actions.setAnswer({id: answer.id}))}}
                        checked = {answer.value ?? false}
                        disabled = {isResults}

                    />
                ))
            }
        </div>
 );
}