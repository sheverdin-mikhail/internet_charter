import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './PopupFormRow.module.css';
import { Input, InputTheme } from 'shared/UI/Input/Input';

export const PopupFormRow = React.forwardRef((props, ref) => {
    const { 
        className, 
        theme, 
        id, 
        label, 
        error, 
        isCorrect=false,
        ...otherProps } = props;

    return (
        <div className={ClassNames(cls.FormInputRow, {}, [className])}>
            <label htmlFor={id} className={cls.label}>{label}</label>
            <Input 
                id={id} 
                theme={InputTheme.CLEAR} 
                className={ClassNames(cls.input, {
                    [cls.isError]: Boolean(error),
                    [cls.isCorrect]: isCorrect
                }, [])} 
                {...otherProps} 
            />
            {error && <span className={cls.error} >{error}</span>}
        </div>
 );
})