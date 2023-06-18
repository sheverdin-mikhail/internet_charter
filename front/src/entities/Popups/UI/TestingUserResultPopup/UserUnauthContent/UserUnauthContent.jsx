import React from 'react';
import cls from './UserUnauthContent.module.css';
import { SmallButton, SmallButtonTheme } from 'shared/UI/SmallButton/SmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { useNavigate } from 'react-router';
import { Button } from 'shared/UI/Button/Button';
import { ButtonTheme } from 'shared/UI/Button/Button';
import { UserSlice } from 'entities/User';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { PopupNavigation } from '../../PopupNavigation/PopupNavigation';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import { TestingSlice } from 'entities/Testing';

export const UserUnauthContent = (props) => {
    const { className } = props;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { result } = useSelector(state => state.testing)


    function ClickSignupHandler(){
        dispatch(UserSlice.actions.setRole('user'))
        dispatch(PopupsSlice.actions.showPopup(PopupNames.SIGNUP))
        if(result.percent === 100){
            dispatch(UserSlice.actions.setStages([result.testId]))
        }
    }
    function ClickSigninHandler(){
        dispatch(PopupsSlice.actions.showPopup(PopupNames.SIGNIN))
        if(result.percent === 100){
            dispatch(UserSlice.actions.setStages([result.testId]))
        }
    }


    function BackHomeHandler(){
        navigate('/')
        dispatch(PopupsSlice.actions.closePopup())
    }

    function CloseHandler(){
        dispatch(TestingSlice.actions.clearTesting())
    }


    return (
        <PopupBoard  className={ClassNames(cls.testingUserResultPopup, {}, [className])}>
            <PopupNavigation handler={CloseHandler} />
            <h2 className={cls.title}>Упс! Ты не зарегистрирован!</h2>
            <p className={cls.text}>Чтобы сохранить прогресс, а также получить доступ к новым испытаниям необходимо войти или зарегистрироваться.</p>
            <SmallButton 
                theme={SmallButtonTheme.DARK} 
                className={cls.button}
                onClick={()=>ClickSignupHandler()}
            >
                Зарегистрироваться
            </SmallButton>
            <SmallButton 
                theme={SmallButtonTheme.DARK} 
                className={cls.button}
                onClick={()=>ClickSigninHandler()}
            >
                Войти
            </SmallButton>
            <Button  theme={ButtonTheme.CLEAR} onClick={()=>BackHomeHandler()}>Вернуться на главную</Button>                        
        </PopupBoard>
 );
}