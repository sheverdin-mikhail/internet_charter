import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './Cross.module.css';

export const Cross = (props) => {
    const { 
        className, 
        size=25, 
        style,
        ...otherProps 
    } = props;

    return (
        <span style={{...style, width: size+'px', height: size+'px'}} className={ClassNames(cls.cross, {}, [className])} {...otherProps}>
            
        </span>
 );
}