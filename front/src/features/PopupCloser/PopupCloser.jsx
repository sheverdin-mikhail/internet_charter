import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Cross } from 'shared/UI/Cross/Cross';


export const PopupCloser = (props) => {

    const { handler=false } = props;
    const dispatch = useDispatch()


    function CloseHandler(){
        if(handler){
            handler()
        }
        dispatch(PopupsSlice.actions.closePopup())
    }

    return (
        <Cross size={23}  onClick={CloseHandler} />
 );
}