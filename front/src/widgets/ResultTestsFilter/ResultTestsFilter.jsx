import React, { useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ResultTestsFilter.module.css';
import { ReactComponent as Arrow} from 'shared/assets/icons/arrow-top.svg'
import { useDispatch, useSelector } from 'react-redux';
import { ResultsSlice } from 'entities/Results/ResultsSlice';


export const ResultTestsFilter = (props) => {
    const { 
        className,
        placeholder,
        items
    } = props;

    const [active, setActive ] = useState()
    const dispatch = useDispatch()
    const { activeTestsFilter } = useSelector(state => state.results)

    function toggleActive(){
        setActive(prev => !prev)
    }

    function setActiveTestsFilterHandler(test){
        if(test === 'all'){
            dispatch(ResultsSlice.actions.setActiveTestsFilter(''))
            setActive(false)
        }else{
            dispatch(ResultsSlice.actions.setActiveTestsFilter(test))
            setActive(false)
        }
    }

    return (
        <div className={ClassNames(cls.select, {}, [className])}>
            <span 
                className={ClassNames(cls.title, {[cls.active]: active}, [])} 
                onClick={()=>toggleActive()} 
            >
                {
                    activeTestsFilter
                    ?
                    items && items.find(test => test.id === activeTestsFilter).title
                    :
                    placeholder
                } 
                <Arrow className={ClassNames(cls.icon, {[cls.active]: active}, [])} /> 
            </span>
            <div className={ClassNames(cls.body, {[cls.active]: active}, [])}>
                <div className={cls.row} key={`resultsTestsFilterItem_all`} 
                    onClick={()=>setActiveTestsFilterHandler('all')}
                >
                    <span className={cls}>Все тесты</span> 
                </div> 
                {
                    items && items.map(test => (
                        <div className={cls.row} key={`resultsTestsFilterItem_${test.id}`} 
                            onClick={()=>setActiveTestsFilterHandler(test.id)}
                        >
                            <span className={cls}>{test.title}</span> 
                        </div> 
                    ))
                }
            </div>
        </div>
 );
}