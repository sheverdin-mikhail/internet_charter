import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './NotFoundResults.module.css';
import Image from 'shared/assets/img/astronaut.png'

export const NotFoundResults = (props) => {
    const { 
        className,
        title, 
        description, 
        children
    } = props;

    return (
        <div className={ClassNames(cls.notFoundResults, {}, [className])}>
            <h2 className={cls.title}>{title}</h2>
            <img src={Image} className={cls.img} alt="" />
            <p className={cls.description}>{description}</p>
            {children}
        </div>
 );
}