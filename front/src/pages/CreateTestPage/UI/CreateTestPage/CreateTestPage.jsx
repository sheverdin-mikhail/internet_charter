import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './CreateTestPage.module.css';
import { NotFoundResults } from 'pages/AccountPage/UI/NotFoundResults/NotFoundResults';
import { Main, MainNavigation } from 'widgets/Main';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { TaskRow } from 'widgets/TaskRow/TaskRow';
import { TestingSlice } from 'entities/Testing';
import { TestingTypes } from 'entities/Testing/redux/TestingSlice';
import { useNavigate } from 'react-router';

export const CreateTestPage = (props) => {
    const { className } = props;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { tasks } = useSelector(state => state.testCreation)

    function ShowTestHandler(){
        dispatch(
            TestingSlice.actions.openTesting({
                test: {
                    id: 0,
                    tasks: tasks
                },
                type: TestingTypes.VIEW
            })
        )
        navigate('/testing')
    }

    return (
        <Main className={ClassNames(cls.createTestPage, {}, [className])} isPrivate={true}>
            <MainNavigation />
            <div >
                {
                    tasks.length > 0
                    ?
                        <>
                        {
                            tasks.map((task, index) => (
                                task && <TaskRow task={task} key={`creationTestTaskItem_${index}`} className={cls.row} index={index} />
                            ))
                        }
                        <div className={cls.buttons}>
                            <Button className={cls.button} onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.CHOSE_QUESTION_TYPE))}>Добавить вопрос</Button>
                            <Button className={cls.button} onClick={()=>ShowTestHandler()}>Просмотреть тест</Button>
                            <Button className={cls.yellow} onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.NAME_CREATION_TEST))} >Сохранить тест</Button>
                        </div>
                        </>
                        
                    :
                    <NotFoundResults title={'Вопросы:'} description="Вы еще не добавили ни одного вопроса" >
                        <Button theme={ButtonTheme.LIGHT} onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.CHOSE_QUESTION_TYPE))} >Добавить вопрос</Button>
                    </NotFoundResults>
                }
            </div>

        </Main>
 );
}