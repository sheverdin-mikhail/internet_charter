import React from 'react';
import cls from './NameCreationTestPopup.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { PopupFormRow } from 'widgets/PopupFormRow/PopupFormRow';
import { TestCreationSlice, testCreationApi } from 'entities/TestCreation';
import { InputTheme } from 'shared/UI/Input/Input';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import { useNavigate } from 'react-router';
import { testsApi } from 'entities/Tests';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const NameCreationTestPopup = (props) => {
    const { className } = props;

    const dispatch = useDispatch()

    const {
        control, 
        handleSubmit, 
        formState: {errors}, 
        reset
    } = useForm({mode: 'onBlur'})
    const [ saveTest ] = testCreationApi.useSaveTestMutation()
    const [ saveEditTest ] = testCreationApi.useSaveEditTestMutation()
    const [ saveCustomTasksFromApi ] = testCreationApi.useSaveCustomTasksFromApiMutation()
    const { role } = useSelector(state=>state.user)

    const navigate = useNavigate()

    const [ fetchTests ] = testsApi.useLazyFetchTestsQuery()
    const { tasks, name, id, isEdit } = useSelector(state => state.testCreation)



    async function saveHandler(data) {
        dispatch(TestCreationSlice.actions.setTestName(data.name))
        const tasksFromApi = tasks.filter(task => task.isPersonal && task.fromApi)
        if(tasksFromApi.length > 0){
            saveCustomTasksFromApi(tasksFromApi)
        }
        if(!isEdit){
            saveTest({name: data.name, tasks: [...tasks]})
            .then(res => {
                if(res.data){
                    dispatch(TestCreationSlice.actions.clearTestCreation())
                    fetchTests({custom:'true', role:role})
                    reset()
                    navigate('/account/my-tests')
                }
            })
        }else{
            saveEditTest({id: id, name: data.name, tasks: [...tasks]})
            .then(res => {
                if(res.data){
                    dispatch(TestCreationSlice.actions.clearTestCreation())
                    fetchTests({custom:'true', role:role})
                    reset()
                    navigate('/account/my-tests')
                }
            })
        }
        
        dispatch(PopupsSlice.actions.closePopup())
        
    }


    return (
        <div className={ClassNames(cls.nameCreationTestPopup, {}, [className])}>
            <PopupNavigation />
            <h2 className={cls.title}>Введите название теста:</h2>
            <form onSubmit={handleSubmit(saveHandler)} className={cls.form}>
                <Controller 
                    name='name'
                    control={control}
                    defaultValue={name}
                    rules={{
                        required: 'Пожулайста введите название теста'
                    }}
                    render={
                        ({field})=> <PopupFormRow 
                            { ...field }
                            theme={InputTheme.CLEAR} 
                            error={errors.class_name?.message}
                            placeholder={'Название теста'} 
                            className={cls.input} 
                            />
                        }
                />
                <Button className={cls.button} theme={ButtonTheme.DARK} >Сохранить</Button>
            </form>
        </div>
 );
}