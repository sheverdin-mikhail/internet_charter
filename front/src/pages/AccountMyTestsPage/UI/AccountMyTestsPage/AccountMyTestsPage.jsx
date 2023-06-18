import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AccountMyTestsPage.module.css';
import { Main, MainNavigation } from 'widgets/Main';
import { TeacherContent } from '../TeacherContent/TeacherContent';
import { testsApi } from 'entities/Tests';
import { useSelector } from 'react-redux';

export const AccountMyTestsPage = (props) => {
    const { className } = props;

    const [ fetchTests ] = testsApi.useLazyFetchTestsQuery()
    const { role } = useSelector(state=>state.user)
    

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
                    <TeacherContent />
                }
            </div>
        </Main>
 );
}