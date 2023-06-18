import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './RadioButton.module.css';

export const RadioButton = (props) => {
    const { className, id, name, text, disabled=false, isCorrect=false, isWrong=false,  ...otherProps } = props;

    return (
        <div className={ClassNames(cls.radioButton, {
                [cls.disabled]: disabled,
                [cls.correct]: isCorrect,
                [cls.wrong]: isWrong
            }, [className])}>
            <input type="radio" name={name} id={id} className={cls.input}  disabled={disabled} {...otherProps} />
            <label htmlFor={id} className={cls.label}>
                {text}
            </label>
        </div>
 );
}