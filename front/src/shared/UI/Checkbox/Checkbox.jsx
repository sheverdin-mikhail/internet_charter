import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './Checkbox.module.css';


export const CheckSides = {
    RIGHT: 'right',
    LEFT: 'left'
} 

export const Checkbox = (props) => {
    const { 
        className,
        text,
        id,
        checkSide=CheckSides.LEFT,
        name,
        value,
        isWrong=false,
        isCorrect=false,
        disabled=false,
        ...otherProps
    } = props;

    return (
        <div className={ClassNames(cls.checkbox, {
            [cls.disabled]: disabled,
            [cls.correct]: isCorrect,
            [cls.wrong]: isWrong
        }, [className])}>
            <input 
                type='checkbox' 
                id={id} 
                name={name} 
                className={ClassNames(cls.input, {}, [])} 
                checked={value}
                disabled={disabled}
                {...otherProps}
            />
            <label htmlFor={id}  className={ClassNames(cls.label, {}, [cls[checkSide]])} >
                {text}
            </label>
        </div>

 );
}