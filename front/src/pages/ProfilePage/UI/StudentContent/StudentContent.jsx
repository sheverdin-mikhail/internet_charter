import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './StudentContent.module.css';
import { StudentForm } from '../StudentForm/StudentForm';
import { AddAvatarButton } from 'features/AddAvatarButton/AddAvatarButton';


export const StudentContent = (props) => {
    const { className } = props;


    return (
        <div className={ClassNames(cls.studentContent, {}, [className])}>
            <div className={cls.ProfilePage}>
                <div className={cls.row}>
                    <AddAvatarButton />
                    <StudentForm className={cls.form} />
                </div>
                <div className={cls.row}></div>
            </div>
        </div>
 );
}