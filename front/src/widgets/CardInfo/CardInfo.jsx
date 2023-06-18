import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './CardInfo.module.css';

export const CardInfo = (props) => {
    const { className, title, icon, text } = props;

    return (
        <div 
            className={ClassNames(cls.cardInfo, {}, [className])}
        >
            <h2 className={cls.title}>{title} {icon}</h2>
            <p className={cls.text}>
                {text}
            </p>
        </div>
 );
}