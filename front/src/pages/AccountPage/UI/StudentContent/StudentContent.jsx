import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './StudentContent.module.css';
import { NotFoundResults } from '../NotFoundResults/NotFoundResults';
import { useSelector } from 'react-redux';
import { testResultApi } from 'entities/TestResult';
import { Loader } from 'shared/UI/Loader/Loader';
import { testsApi } from 'entities/Tests';
import { ResultTestsFilter } from 'widgets/ResultTestsFilter/ResultTestsFilter';
import { ResultTable } from 'widgets/ResultTable/ResultTable';

export const StudentContent = (props) => {
    const { className } = props;

    const { role } = useSelector(state => state.user)
    const { activeTestsFilter } = useSelector(state => state.results)
    const [ getResults , { data: results, isLoading }] = testResultApi.useLazyGetResultsQuery({role: role})
    const [ fetchTests, { data: tests, isLoading: testLoading}] = testsApi.useLazyFetchTestsQuery({role: role})

    
    useEffect(()=>{
        fetchTests({role: role})
        if(activeTestsFilter){
            getResults({role: role, test: activeTestsFilter})
        }else{
            getResults({role: role})
        }
        
    },[activeTestsFilter])


    return (
        <div className={ClassNames(cls.studentContent, {}, [className])}>
            {
                testLoading
                ?
                <Loader/>
                :
                <ResultTestsFilter items={tests} placeholder={"Выберите тест"} className={cls.filter} />
            } 
            {
               isLoading
               ?
               <Loader />
               :
               results && results.length > 0
                ?
                <ResultTable results={results} className={cls.table} />
                :
                <NotFoundResults title={'Мои результаты:'} description={'Вы пока не прошли ни одного теста'} />
            }
        </div>
 );
}