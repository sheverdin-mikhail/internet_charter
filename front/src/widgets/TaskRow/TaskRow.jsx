import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TaskRow.module.css';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { TestCreationSlice } from 'entities/TestCreation';
import { useDispatch, useSelector } from 'react-redux';
import { NewQuestionCreateSlice } from 'entities/NewQuestionCreate';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { TestingSlice } from 'entities/Testing';
import { TestingTypes } from 'entities/Testing/redux/TestingSlice';
import { useNavigate } from 'react-router';

export const TaskRow = (props) => {
    const { 
        className,
        task,
        index
    } = props;

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { tasks } = useSelector(state => state.testCreation)

    function deleteTaskHandler(){
        dispatch(TestCreationSlice.actions.deleteTaskFromList(task.id))
    }

    function openQuestionEditionHandler(id){
        const task = tasks.find(task => task.id === id)
        dispatch(NewQuestionCreateSlice.actions.setEditionalQuestion(task))
        dispatch(PopupsSlice.actions.showPopup(PopupNames.QUESTION_CONSTRUCTOR))

    }

    function ShowTaskHanlder(task, index){
        dispatch(
            TestingSlice.actions.openTesting({
                test: {
                    id: 0,
                    tasks: [task],
                },
                type: TestingTypes.ONE_TASK_VIEW,
                activeTask: task,
                taskIndex: index
            })
        )
        navigate('/testing')
    }

    return (
        <div className={ClassNames(cls.taskRow, {}, [className])}>
            <span className={cls.number}>{index + 1} Вопрос</span>
            <span className={cls.question}>{task.question}</span>
            {task.isPersonal && <Button theme={ButtonTheme.DARK} onClick={()=>openQuestionEditionHandler(task.id)} >Редактировать</Button>}
            <Button theme={ButtonTheme.CLEAR} 
                onClick={()=>ShowTaskHanlder(task, index)}
            >Просмотреть</Button>
            <Button theme={ButtonTheme.CLEAR} onClick={()=>deleteTaskHandler()}>Удалить</Button>
        </div>
 );
}