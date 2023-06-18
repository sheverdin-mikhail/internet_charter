import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AccountPage.module.css';
import { Main, MainNavigation } from 'widgets/Main';
import { useSelector } from 'react-redux';
import { StudentContent } from '../StudentContent/StudentContent';
import { TeacherContent } from '../TeacherContent/TeacherContent';

export const AccountPage = (props) => {
    const { className } = props;


    const {role} = useSelector(state=>state.user)

    return (
        <Main isPrivate={true}>
            <MainNavigation />
            <div className={ClassNames(cls.accountPage, {}, [className])}>
                {
                    role === 'student'
                    ?
                    <StudentContent />
                    :
                    <TeacherContent />
      
                }
            </div>
        </Main>
 );
}