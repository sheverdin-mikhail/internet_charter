import React, { useEffect, useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './InputWithCheckbox.module.css';
import { Checkbox } from 'shared/UI/Checkbox/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { NewQuestionCreateSlice } from 'entities/NewQuestionCreate';

export const InputWithCheckbox = (props) => {
    const { className, placeholder, canDelete, value, id } = props;
    const dispatch = useDispatch()
    const { correctAnswers } = useSelector(state => state.newQuestionCreate)
    const [input, setInput ] = useState(value ?? '')
    const [checked, setChecked ] = useState(Boolean(correctAnswers.find((answer)=>answer.id === id)))

    function BlurHandler(){
        dispatch(NewQuestionCreateSlice.actions.checkboxAnswersHandler({
            id: id,
            value: input,
            checked: checked
        }))
        setInput('')
    }


    useEffect(()=>{
        setChecked(Boolean(correctAnswers.find((answer)=>answer.id === id)))
    }, [correctAnswers])

    return (
        <div className={ClassNames(cls.inputWithCheckbox, {}, [className])}>
            <Checkbox 
                className={cls.checkbox} 
                id={id} 
                checked={checked}
                onChange = {()=> dispatch(NewQuestionCreateSlice.actions.toggleCheckboxAnswer({
                    id: id,
                    value: input
                }))}
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