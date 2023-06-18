import React from 'react';
import { useSelector } from 'react-redux';
import { PopupBodies } from 'entities/Popups/redux/PopupsSlice';
import { PopupWrapper } from 'widgets/PopupWrapper/PopupWrapper';

export const Popups = (props) => {

    const { activePopup} = useSelector(state => state.popups)

    
    const SomePopup = activePopup !== null ? PopupBodies[activePopup] : null

    return (
        <>
            {
            SomePopup
                ? 
                    <PopupWrapper> 
                        <SomePopup {...props}/> 
                    </PopupWrapper> 
                : 
                    null
            }
        </>
        
    )
}