import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ProfilePage.module.css';
import { Main, MainNavigation } from 'widgets/Main';
import {  useSelector } from 'react-redux';
import { StudentContent } from '../StudentContent/StudentContent';
import { TeacherContent } from '../TeacherContent/TeacherContent';
import { UserContent } from '../UserContent/UserContent';

export const ProfilePage = (props) => {
    const { className } = props;


    const {role} = useSelector(state=>state.user)
  

    return (
        <Main isPrivate={true}>
            <MainNavigation />
            <div className={ClassNames(cls.profilePage, {}, [className])}>
                {
                    role === 'student'
                    ?
                    <StudentContent />
                    :
                    role === 'teacher'
                    ?
                    <TeacherContent />
                    :
                    <UserContent />
                }
            </div>
        </Main>
 );
}