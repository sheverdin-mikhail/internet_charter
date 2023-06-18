import React, { useEffect } from 'react';
import cls from './OpenAccessPopup.module.css';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { useDispatch, useSelector } from 'react-redux';
import { PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import { CheckSides, Checkbox } from 'shared/UI/Checkbox/Checkbox';
import { Controller, useForm } from 'react-hook-form';
import { testCreationApi } from 'entities/TestCreation';
import { SmallButton, SmallButtonTheme } from 'shared/UI/SmallButton/SmallButton';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const OpenAccessPopup = (props) => {
    const { className } = props;
    const dispatch = useDispatch()
    const { chosedTest } = useSelector(state => state.user)


    const {
        control, 
        handleSubmit, 
        reset
    } = useForm({mode: 'onBlur'})

    const [ fetchClasses, {data} ] = testCreationApi.useLazyFetchClassesForActivatioinQuery({refetchOnFocus: true})
    const [ setClasses ] = testCreationApi.useSetTestForClassesMutation()

    useEffect(()=>{
        fetchClasses()
    },[])
    

    function SubmitHandler(data){
        setClasses(
            {
                test: chosedTest.id,
                classes: Object.keys(data).map(classId => (
                    {
                        id: classId,
                        test: data[classId]
                    }
                ))
            }
        ).then(res => {
            if(res.data){
                dispatch(PopupsSlice.actions.openMessage(res.data.message))
                fetchClasses()
                reset()
            }
        })
    }


    return (
        <PopupBoard className={ClassNames(cls.openAccessPopup, {}, [className])}>
            <PopupNavigation />
            
            <h2 className={cls.title}>Предоставление доступа к тесту: <br />{chosedTest.title}</h2>

            <form className={cls.classes}>
            {
                data && data.length > 0
                ?
                    data.map((classroom) => <Controller 
                        key={`ClassroomRow_${classroom.id}`}
                        name={`${classroom.id}`}
                        control={control}
                        defaultValue={Boolean(classroom.tests.find(({id})=>id===chosedTest.id))}
                        render={({field})=> <Checkbox 
                            {...field} 
                            text={classroom.class_name} 
                            id={classroom.id} 
                            name='classroom' 
                            checkSide={CheckSides.RIGHT} 
                            className={cls.row} 
                        />}
                    />)
                :
                    <h2 className={cls.title}>Классов не найдено</h2>
            }
            </form>
            <SmallButton onClick={handleSubmit(SubmitHandler)} theme={SmallButtonTheme.DARK} className={cls.button}>Предоставить</SmallButton>

        </PopupBoard>
 );
}