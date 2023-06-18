import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ResultClassesFilter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ResultsSlice } from 'entities/Results/ResultsSlice';

export const ResultClassesFilter = (props) => {
    const { 
        className,
        classes
    } = props;

    const dispatch = useDispatch()

    const { activeClassFilter } = useSelector(state => state.results)

    function setActiveClassFilter(id){
        dispatch(ResultsSlice.actions.setActiveClassFilter(id))
    }

    return (
        <div className={ClassNames(cls.resultClassesFilter, {}, [className])}>
            {
                classes.map(item => (
                    <span 
                        key={`resultClassesFilterItem_${item.id}`} 
                        className={ClassNames(cls.item, {[cls.active]: item.id === activeClassFilter}, [])}
                        onClick={()=>setActiveClassFilter(item.id)}
                    >
                        {item.name}
                    </span>
                ))
            }
            <span 
                className={ClassNames(cls.item, {[cls.active]: activeClassFilter.length === 0}, [])}
                onClick={()=>dispatch(ResultsSlice.actions.clearClassFilter())}
            >
                ВСЕ
            </span>
        </div>
 );
}