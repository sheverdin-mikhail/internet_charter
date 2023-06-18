import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './CheckboxAnswers.module.css';
import { Checkbox } from 'shared/UI/Checkbox/Checkbox';
import { TestingSlice } from 'entities/Testing';
import { useDispatch } from 'react-redux';

export const CheckboxAnswers = (props) => {
    const { 
        className,
        answers,
        isResults=false
    } = props;

    const dispatch = useDispatch()


    return (
        <div className={ClassNames(cls.checkboxAnswers, {}, [className])}>
            {
                answers.map((answer, index) => (
                    <Checkbox 
                        text={answer.text} 
                        id={`answer_${index}`} 
                        key={`checkboxAnswerItem_${index}`} 
                        className={cls.row}
                        onChange={()=>{dispatch(TestingSlice.actions.setAnswer({id: answer.id}))}}
                        checked = {answer.value ?? false}
                        disabled = {isResults}
                        isCorrect = {answer.isCorrect === true && isResults}
                        isWrong = {answer.value === true && answer.isCorrect === false && isResults}
                    />
                ))
            }
        </div>
 );
}