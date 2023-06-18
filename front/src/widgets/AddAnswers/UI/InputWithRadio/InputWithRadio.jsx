import React, { useEffect, useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './InputWithRadio.module.css';
import { RadioButton } from 'shared/UI/RadioButton/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { NewQuestionCreateSlice } from 'entities/NewQuestionCreate';

export const InputWithRadio = (props) => {
    const { className, placeholder, canDelete, value, id, disabled} = props;
    const [input, setInput ] = useState(value ?? '')

    const { correctAnswers } = useSelector(state => state.newQuestionCreate)

    const [checked, setChecked ] = useState(Boolean(correctAnswers.find((answer)=>answer.id === id)))


    const dispatch = useDispatch()


    function BlurHandler(){
        dispatch(NewQuestionCreateSlice.actions.radioAnswersHandler({
            id: id,
            value: input
        }))
        setInput('')
    }

    useEffect(()=>{
        setChecked(Boolean(correctAnswers.find((answer)=>answer.id === id)))
    }, [correctAnswers])


    return (
        <div className={ClassNames(cls.inputWithRadio, {}, [className])}>
            <RadioButton 
                className={cls.radio} 
                id={id} 
                name={'answer'}
                disabled={disabled}
                checked={checked}
                onChange = {
                    e => dispatch(NewQuestionCreateSlice.actions.toggleRadioAnswer({id:id, value: input}))
                }
            />
            <input 
                type="text" 
                className={cls.input} 
                placeholder={placeholder} 
                value={value ?? input}
                disabled={value ?? false}
                onChange={e=>setInput(e.target.value)}
                onBlur={e=>BlurHandler()}
            />
            {
                
                canDelete &&  <button 
                    className={cls.button}
                    onClick={() => dispatch(NewQuestionCreateSlice.actions.checkboxAnswersHandler({
                        id: id,
                        value: ''
                    }))}
                >
                    Удалить
                </button>
            }
        </div>
 );
}