import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './UserAuthContent.module.css';
import { SmallButton, SmallButtonTheme } from 'shared/UI/SmallButton/SmallButton';
import { useDispatch, useSelector } from 'react-redux';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { useNavigate } from 'react-router';
import { ReactComponent as Medal } from 'shared/assets/icons/active-medal-icon.svg'
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { PopupNavigation } from '../../PopupNavigation/PopupNavigation';
import { TestingSlice } from 'entities/Testing';
import { testResultApi } from 'entities/TestResult';
import { testsApi } from 'entities/Tests';
import { UserSlice } from 'entities/User';



export const UserAuthContent = (props) => {
    const { className } = props;
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { stage } = useSelector(state => state.tests)
    const [ sendStage ] = testResultApi.useSendStageResultsMutation()
    const [ fetchCompletedStages ] = testsApi.useLazyFetchCompletedStagesQuery()



    function BackToTestsHandler(){
        dispatch(PopupsSlice.actions.closePopup())
        navigate('/tests')
    }

    function ShowProgressHandler(){
        dispatch(PopupsSlice.actions.closePopup())
        navigate('/progress')
    }

    function CloseHandler(){
        dispatch(TestingSlice.actions.clearTesting())
        sendStage({id: stage.id})
        .then(res=>{
            if(res.data && res.data.certificate){
                dispatch(PopupsSlice.actions.openMessage(res.data.message))
                dispatch(UserSlice.actions.setCertificate())
            }
            fetchCompletedStages()
        })
        
    }


    return (
        <PopupBoard closeHandler={CloseHandler}  className={ClassNames(cls.testResultPopup, {}, [className])}>
            <PopupNavigation />
            <h2 className={cls.title}>Поздравляем!</h2>
            <p className={cls.text}>
                Ты прошёл испытание и заработал медаль.
                Собери все медали, чтобы получить именную грамоту! 
            </p>
            <Medal className={cls.icon} />
            <SmallButton 
                theme={SmallButtonTheme.DARK} 
                className={cls.button}
                onClick={()=>BackToTestsHandler()}
            >
                Вернуться к испытаниям
            </SmallButton>
            <SmallButton 
                theme={SmallButtonTheme.DARK} 
                className={cls.button}
                onClick={()=>ShowProgressHandler()}
            >
                Мои награды
            </SmallButton>
        </PopupBoard>
    )}