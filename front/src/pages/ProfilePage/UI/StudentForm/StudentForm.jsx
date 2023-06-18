import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './StudentForm.module.css';
import { FormInputRow } from 'widgets/FormInputRow/FormInputRow';
import { useSelector } from 'react-redux';

export const StudentForm = (props) => {
    const { className } = props;
    const { firstName, secondName } = useSelector(state => state.user)


    return (
        <div className={ClassNames(cls.ProfileForm, {}, [className])}>
            <FormInputRow 
                theme={'border'} 
                id={'firstname'} 
                name={'firstname'} 
                placeholder='Иван' 
                value={firstName}
                label='Имя:' 
                className={cls.row} 
            />
            <FormInputRow 
                theme={'border'} 
                id={'secondname'} 
                name={'secondname'} 
                value={secondName}
                placeholder='Иванов' 
                label='Фамилия:' 
                className={cls.row} 
            />
        </div>
 );
}