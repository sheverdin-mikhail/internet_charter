import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AccountTestsPage.module.css';
import { Main, MainNavigation } from 'widgets/Main';
import { StudentContent } from '../StudentContent/StudentContent';
import { useSelector } from 'react-redux';
import { TeacherContent } from '../TeacherContent/TeacherContent';
import { testsApi } from 'entities/Tests';

export const AccountTestsPage = (props) => {
    const { className } = props;

    const {role} = useSelector(state=>state.user)
    const [ fetchTests ] = testsApi.useLazyFetchTestsQuery()


    useEffect(() => {
        fetchTests({
            "custom": 'false',
            "role": role
        })
    }, [])



    return (
        <Main isPrivate={true}>
            <MainNavigation />
            <div className={ClassNames(cls.accountTestsPage, {}, [className])}>
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