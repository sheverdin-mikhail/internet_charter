import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ResultsPage.module.css';
import { Main, MainNavigation } from 'widgets/Main';
import { ResultClassesFilter } from '../ResultClassesFilter/ResultClassesFilter';
import { useSelector } from 'react-redux';
import { ResultTestsFilter } from 'widgets/ResultTestsFilter/ResultTestsFilter';
import { ResultTable } from 'widgets/ResultTable/ResultTable';
import { testsApi } from 'entities/Tests';
import { testResultApi } from 'entities/TestResult';
import { Loader } from 'shared/UI/Loader/Loader';
import { NotFoundResults } from 'pages/AccountPage/UI/NotFoundResults/NotFoundResults';

export const ResultsPage = (props) => {
    const { className } = props;

    const { classes } = useSelector(state => state.classes)
    const { role } = useSelector(state => state.user)
    const { activeTestsFilter, activeClassFilter } = useSelector(state => state.results)

    const [fetchTests, { data: tests, isLoading: testLoading}] = testsApi.useLazyFetchTestsQuery({role: role, custom: 'all'})
    const [ getResults , { data: results, isLoading }] = testResultApi.useLazyGetResultsQuery({role: role})



    useEffect(()=>{
        fetchTests({role: role})
    }, [])


    useEffect(()=>{
        
        const params = {role: role}

        if (activeTestsFilter){
            params.test = activeTestsFilter
        }
        if(activeClassFilter){
            params.classroom = activeClassFilter
        }
        getResults(params)

    },[activeTestsFilter, activeClassFilter])

    return (
        <Main isPrivate={true}>
            <MainNavigation />
            <div className={ClassNames(cls.resultsPage, {}, [className])}>
            {
                testLoading
                ?
                <Loader/>
                :
                <ResultTestsFilter items={tests} placeholder={"Выберите тест"} className={cls.filter} />
            } 
                <ResultClassesFilter classes={classes} className={cls.classFilter} />
            {
               isLoading
               ?
               <Loader />
               :
               results && results.length > 0
                ?
                <ResultTable results={results} className={cls.table} />
                :
                <NotFoundResults title={'Результаты учеников:'} description={'Пока нет результатов'} />
            }
            </div>
        </Main>
 );
}