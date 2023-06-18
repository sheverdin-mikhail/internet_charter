import React from 'react';
import cls from './MessagePopup.module.css';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { useSelector } from 'react-redux';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const MessagePopup = (props) => {
    const { className } = props;
    const { message } = useSelector(state => state.popups)



    return (
        <PopupBoard className={ClassNames(cls.messagePopup, {}, [className])}>
            <PopupNavigation />
            
            <h2 className={cls.text}>{message}</h2>

        </PopupBoard>
 );
}