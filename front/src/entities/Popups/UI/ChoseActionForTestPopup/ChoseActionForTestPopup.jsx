import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ChoseActionForTestPopup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { TestCreationSlice, testCreationApi } from 'entities/TestCreation';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { useNavigate } from 'react-router';
import { testsApi } from 'entities/Tests';
import { TestingSlice, TestingTypes } from 'entities/Testing/redux/TestingSlice';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const ChoseActionForTestPopup = (props) => {
    const { className } = props;

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ deleteTest ] = testCreationApi.useDeleteTestMutation()
    const [ fetchTests ] = testsApi.useLazyFetchTestsQuery()

        
    const { chosedTest, role } = useSelector(state => state.user)

    function ClickEditHandler(){
        dispatch(TestCreationSlice.actions.setTest(chosedTest))
        navigate('/account/create-test')
        dispatch(PopupsSlice.actions.closePopup())
    }

    function ClickDeleteHandler(){
        deleteTest(chosedTest).then(res => {
            if(res.data){
                fetchTests({role: role, custom: 'true'})
                dispatch(PopupsSlice.actions.openMessage(res.data.message))
            }else if(res.error){
                dispatch(PopupsSlice.actions.openMessage(res.error.message))
            }
        })
    }

    
    function ClickViewHandler(){
        dispatch(TestingSlice.actions.openTesting({
            test: chosedTest,
            type: TestingTypes.VIEW
        }))
        dispatch(PopupsSlice.actions.closePopup())
        navigate('/testing')
    }


 

    return (
        <PopupBoard className={ClassNames(cls.choseActionForCustomTest, {}, [className])}>
            <PopupNavigation />
            <h2 className={cls.title}>{chosedTest.title}</h2>
            <Button 
                className={cls.button} 
                theme={ButtonTheme.DARK} 
                onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.OPEN_ACCESS))}
            >
                Открыть доступ классам
            </Button>
            <Button 
                className={cls.button} 
                theme={ButtonTheme.DARK} 
                onClick={ClickViewHandler}
            >
                Просмотреть тест
            </Button>
            {
                chosedTest.creator
                ?
                <>
                    <Button 
                        className={cls.button} 
                        theme={ButtonTheme.DARK} 
                        onClick={ClickEditHandler}
                    >
                            Изменить
                    </Button>
                    <Button 
                        className={cls.button}
                        theme={ButtonTheme.DARK}
                        onClick={ClickDeleteHandler}
                    >
                        Удалить
                    </Button>
                </>
                :
                null
            }
        </PopupBoard>
 );
}