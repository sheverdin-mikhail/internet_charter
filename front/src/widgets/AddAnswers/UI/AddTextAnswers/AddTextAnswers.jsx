import React, { useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AddTextAnswers.module.css';
import { Input } from 'shared/UI/Input/Input';
import { NewQuestionCreateSlice } from 'entities/NewQuestionCreate';
import { useDispatch, useSelector } from 'react-redux';

export const AddTextAnswers = (props) => {
    const { className } = props;

    const [input, setInput] = useState('')

    const { correctAnswers } = useSelector(state => state.newQuestionCreate)
    const dispatch = useDispatch()

    function BlurHandler(answer){
        dispatch(NewQuestionCreateSlice.actions.textAnswersHandler(answer))
        setInput('')
    }



    function ChangeHandler(answer){
        dispatch(NewQuestionCreateSlice.actions.textAnswersHandler(answer))
    }

    return (
        <div className={ClassNames(cls.addTextAnswers, {}, [className])}>

                {
                    correctAnswers.length > 0 
                    ?
                    correctAnswers.map(({id, value})=>(
                            <Input 
                                className={cls.input} 
                                value={value} 
                                key={id} 
                                onChange={e=>ChangeHandler({
                                    id: id,
                                    value: e.target.value
                                })} 
                            />
                        ))
                    :
                        <Input 
                            className={cls.input} 
                            placeholder="Введите возможный вариант ответа" 
                            onBlur={e=>dispatch(NewQuestionCreateSlice.actions.textAnswersHandler({
                                id: correctAnswers.length + 1,
                                value: e.target.value
                            }))}
                        />

                    
                }
                <Input 
                    className={cls.input} 
                    placeholder="Дополнительный вариант*" 
                    onChange={e => setInput(e.target.value)}
                    value={input}
                    onBlur={e=>BlurHandler({
                        id: correctAnswers.length + 1,
                        value: e.target.value
                    })}
                />

                <span className={cls.help}>*  - Необязательно для заполнения</span>

        </div>
 );
}