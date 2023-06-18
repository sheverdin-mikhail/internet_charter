import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './PopupWrapper.module.css';

export const PopupWrapper = (props) => {
    const { className, children, ...otherProps } = props;

    return (
        <div 
            className={ClassNames(cls.popupWrapper, {}, [className])} 
            {...otherProps} 
        >
            {children}
        </div>
 );
}