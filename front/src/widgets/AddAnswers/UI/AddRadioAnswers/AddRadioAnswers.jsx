import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AddRadioAnswers.module.css';
import { InputWithRadio } from '../InputWithRadio/InputWithRadio';
import { useSelector } from 'react-redux';

export const AddRadioAnswers = (props) => {
    const { className } = props;
    const {answers} = useSelector(state => state.newQuestionCreate)


    return (
        <div className={ClassNames(cls.addRadioAnswers, {}, [className])}>
            {
                answers.map(answer => (
                    <InputWithRadio 
                        className={cls.input} 
                        id={answer.id} 
                        key={`radioAnswer_${answer.id}`}
                        value={answer.value}
                        canDelete
                    /> 
                ))
            }
            <InputWithRadio id={answers.length + 1} disabled className={cls.input} placeholder={'Добавить вариант ответа'}/>

        </div>
    )
}