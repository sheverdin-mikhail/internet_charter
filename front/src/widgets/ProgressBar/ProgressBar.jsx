import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ProgressBar.module.css';
import { useSelector } from 'react-redux';

export const ProgressBar = (props) => {
    const { 
        className,
        tasks
    } = props;

    const {activeTask} = useSelector(state => state.testing)


    return (
        <div className={ClassNames(cls.progressBar, {}, [className])}>
            { tasks && tasks.map((task, index) => (
                <div className={ClassNames(cls.label, {[cls.active]: activeTask.id===task.id}, [])} key={`testingBarLabel_${index}`}>{index+1}</div>
            )) }
        </div>
 );
}