import React from 'react';
import { useSelector } from 'react-redux';
import { UserAuthContent } from '../UserAuthContent/UserAuthContent';
import { UserUnauthContent } from '../UserUnauthContent/UserUnauthContent';
import { TestingFailContent } from '../TestingFailContent/TestingFailContent';

export const TestingUserResultPopup = (props) => {

    const { isAuthenticate } = useSelector(state => state.user)
    const { result } = useSelector(state => state.testing)


    

    return (
            <>
            {
                result && result.percent === 100
                ?
                    isAuthenticate
                    ?
                    <UserAuthContent/>
                    :
                    <UserUnauthContent/>
                :
                    <TestingFailContent/>
            }
            </>
 );
}