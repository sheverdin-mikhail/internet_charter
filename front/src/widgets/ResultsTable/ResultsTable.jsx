import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ResultsTable.module.css';

export const ResultsTable = (props) => {
    const { 
        className,
        results
    } = props;


    return (
        <div className={ClassNames(cls.resultsTable, {}, [className])}>
             <div className={cls.tableHeader}>
                <div className={cls.row}>
                    <div className={cls.col}>
                        <span>Тест</span>
                    </div>
                    <div className={ClassNames(cls.col, {}, [cls.centerCol])}>
                        <span>Дата прохождения</span>
                    </div>
                    <div className={cls.col}>
                        <span>Результат</span>
                    </div>
                </div>
             </div>
            <div className={cls.tableBody}>
                {
                    results.map((result) => (
                        <div className={cls.row} key={`resultTableRow_${result.id}`}>
                            <div className={cls.col}>
                                <span>{result.test.title}</span>
                            </div>
                            <div className={ClassNames(cls.col, {}, [cls.centerCol])}>
                                <span>{new Date(result.created_at).toLocaleString()}</span>
                            </div>
                            <div className={cls.col}>
                                <span>{result.correct_answers_count}/{result.total_answers_count}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
 );
}