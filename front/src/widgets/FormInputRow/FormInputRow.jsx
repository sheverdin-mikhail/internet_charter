import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './FormInputRow.module.css';
import { Input } from 'shared/UI/Input/Input';

export const FormInputRow = React.forwardRef((props, ref) => {
    const { className, theme, id, label,...otherProps } = props;

    return (
        <div className={ClassNames(cls.FormInputRow, {}, [className])} ref={ref}>
            <label htmlFor={id} className={cls.label}>{label}</label>
            <Input id={id} theme={theme} className={cls.input} {...otherProps} />
        </div>
 );
})