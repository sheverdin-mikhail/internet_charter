import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './QuestionConstructorPopup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { Input } from 'shared/UI/Input/Input';
import { NewQuestionCreateSlice } from 'entities/NewQuestionCreate';
import { Select } from 'shared/UI/Select/Select';
import { AddAnswers } from 'widgets/AddAnswers';
import { Button } from 'shared/UI/Button/Button';
import { TestCreationSlice } from 'entities/TestCreation';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { questionTypes } from 'shared/models/TestModels';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';


export const QuestionConstructorPopup = (props) => {
    const { className } = props;


    const { id, question, questionType, answers, correctAnswers, isEdit } = useSelector(state=>state.newQuestionCreate)

    const dispatch = useDispatch()

    function closeHandler(){
        dispatch(NewQuestionCreateSlice.actions.clearForm())
    }

    function SubmitSaveHandler(){
        dispatch(TestCreationSlice.actions.addCustomQuestion({
            type: questionType,
            question: question,
            answers: answers.map(answer => ({
                id: answer.id,
                text: answer.value,
                isCorrect: Boolean(correctAnswers.find(({id}) => id === answer.id))
            })),
            isPersonal: true
        }))
       
        closeHandler()
        dispatch(PopupsSlice.actions.closePopup())
    }

    function SubmitEditHandler(){
        dispatch(TestCreationSlice.actions.saveEditionQuestion({
            id: id,
            type: questionType,
            question: question,
            answers: answers.map(answer => ({
                id: answer.id,
                text: answer.value,
                isCorrect: Boolean(correctAnswers.find(({id}) => id === answer.id))
            })),
        }))
        closeHandler()
        dispatch(PopupsSlice.actions.closePopup())
    }


    return (
        <PopupBoard closeHandler={closeHandler} className={ClassNames(cls.choseTestCategoryPopup, {}, [className])}>
            <PopupNavigation handler={closeHandler} />
            <h2 className="popupTitle">
                Новый вопрос
            </h2>
            <label htmlFor="question" className={cls.label}>
                Введите вопрос
            </label>
            <Input 
                name={'question'} 
                id={'question'}
                placeholder={"Вопрос без заголовка"} 
                value={question} 
                onChange={e => dispatch(NewQuestionCreateSlice.actions.setQuestion(e.target.value))}
                className={cls.input}
            />

            <Select 
                options={[
                    { label: "Текст", value: questionTypes.TEXT },
                    { label: "Несколько из списка", value: questionTypes.CHECKBOX },
                    { label: "Один на выбор", value: questionTypes.RADIO },
                ]} 
                activeOption={questionType}
                className={cls.select}
            />

            <AddAnswers questionType={questionType} />

            <div className={cls.buttons}>
                <Button>Просмотреть</Button>
                {
                    isEdit
                    ?
                    <Button
                        onClick={()=>SubmitEditHandler()}
                        >Сохранить изменения</Button>
                    :
                        <Button
                        onClick={()=>SubmitSaveHandler()}
                        >Добавить вопрос в тест</Button>
                }
            </div>
            
        </PopupBoard>
 );
}