import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './PopupNavigation.module.css';
import { PopupCloser } from 'features/PopupCloser/PopupCloser';
import { PopupBackButton } from 'features/PopupBackButton/PopupBackButton';

export const PopupNavigation = (props) => {
    const { className, handler=false } = props;


    return (
        <div className={ClassNames(cls.popupNavigation, {}, [className])}>
            <PopupBackButton handler={handler}/>
            <PopupCloser handler={handler} />
        </div>
 );
}