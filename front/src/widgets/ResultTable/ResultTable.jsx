import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ResultTable.module.css';

export const ResultTable = (props) => {
    const { 
        className,
        results
    } = props;


    return (
        <div className={ClassNames(cls.resultTable, {}, [className])}>
            {
                results.map(result => (
                    <div className={cls.row} key={`resultTableRow_${result.id}`}>
                        {
                            typeof(result.student) === 'object'
                            ?
                            <span className={cls.fio}>ФИО: {result.student.fio}</span>
                            : null
                        }
                        <span className={cls.fio}>Тест: {result.test.title}</span>
                        <span className={cls.result}>Результат: {result.correct_answers_count}/{result.total_answers_count}</span>
                        <span className={cls.date}>Дата: {new Date(result.created_at).toLocaleString()}</span>
                    </div>
                ))
            }
        </div>
 );
}