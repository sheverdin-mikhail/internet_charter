import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AddCheckboxAnswers.module.css';
import { InputWithCheckbox } from '../InputWithCheckbox/InputWithCheckbox';
import { useSelector } from 'react-redux';


export const AddCheckboxAnswers = (props) => {
    const { className } = props;

    const { answers } = useSelector(state => state.newQuestionCreate)
    
    return (
        <div className={ClassNames(cls.addCheckboxAnswers, {}, [className])}>
            {
                answers.map(answer => (
                    <InputWithCheckbox 
                        className={cls.input} 
                        value={answer.value} 
                        name="answer" 
                        id={answer.id} 
                        key={`checkboxAnswer_${answer.id}`} 
                        placeholder={'Добавить ответ'} 
                        canDelete
                    />
                ))
            }
            <InputWithCheckbox className={cls.input} name="answer" id={answers.length+1} placeholder={'Добавить ответ'} />
        </div>
 );
}