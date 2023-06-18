import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import React from 'react';
import cls from './PopupBackButton.module.css'
import { useDispatch } from 'react-redux';


export const PopupBackButton = (props) => {

    const { handler=false } = props;
    const dispatch = useDispatch()


    function ClickHandler(){
        if(handler){
            handler()
        }
        dispatch(PopupsSlice.actions.showPreviousPopup())
    }

    return (
        <span className={cls.popupBackButton} onClick={ClickHandler}>
            &larr;
        </span>
 );
}