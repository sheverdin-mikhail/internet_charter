import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TeacherContent.module.css';
import { ProfileForm } from '../ProfileForm/ProfileForm';
import { AddAvatarButton } from 'features/AddAvatarButton/AddAvatarButton';

export const TeacherContent = (props) => {
    const { className } = props;

    return (
        <div className={ClassNames(cls.teacherContent, {}, [className])}>
             <div className={cls.row}>
                <AddAvatarButton />
                <ProfileForm className={cls.form} rabbitView={false}/>
            </div>
            <div className={cls.row}></div>
        </div>
 );
}