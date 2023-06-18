import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TestCardsList.module.css';
import { SmallTestCard } from 'widgets/SmallTestCard/SmallTestCard';

export const TestCardsList = (props) => {
    const { 
        className,
        tests
    } = props;

    return (
        <div className={ClassNames(cls.testCardsList, {[cls.center]: tests?.length > 3}, [className])}>
            {tests && tests.map((test) => (
                <SmallTestCard test={test} key={test.id} className={cls.card}/>
            ))}
        </div>
 );
}