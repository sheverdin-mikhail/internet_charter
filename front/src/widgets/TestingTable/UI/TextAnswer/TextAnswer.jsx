import React from 'react';
import cls from './TextAnswer.module.css';
import { InputTheme } from 'shared/UI/Input/Input';
import { PopupFormRow } from 'widgets/PopupFormRow/PopupFormRow';
import { useDispatch, useSelector } from 'react-redux';
import { TestingSlice } from 'entities/Testing';


export const TextAnswer = (props) => {
    const { isResults=false } = props;

    const { activeTask } = useSelector(state => state.testing)
    const dispatch = useDispatch()


    return (
        <PopupFormRow 
            className={cls.input} 
            theme={InputTheme.CLEAR} 
            label={'Введите ваш ответ: '} 
            onChange={e=>{dispatch(TestingSlice.actions.setAnswer({value: e.target.value}))}}
            value = {activeTask.answers?.length > 0 && activeTask.answers[0].value}
            disabled = {isResults}
            error = {
                Boolean(activeTask.answers?.find(answer => answer.value ?? '' !== answer.text)) && isResults
                ? `Возможные варианты ответов: ${activeTask.answers.map(answer => answer.text).join(', ')}`
                : null
            }
            isCorrect = {Boolean(activeTask.answers?.find(answer => answer.value ?? '' === answer.text)) && isResults}
        />
 );
}