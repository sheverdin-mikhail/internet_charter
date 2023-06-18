import React, { useEffect, useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TestCard.module.css';
import Image from 'shared/assets/img/test-img.png'
import { SmallButton, SmallButtonTheme } from 'shared/UI/SmallButton/SmallButton';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { TestsSlice, testsApi } from 'entities/Tests';


export const TestCard = (props) => {
    const { 
        className,
        card,
        active
    } = props;

    const [ disabled, setDisabled ] = useState(false)


    const navigation = useNavigate()
    const disptach = useDispatch()

    const { isAuthenticate } = useSelector(state => state.user)

    function ClickHandler(){
        disptach(TestsSlice.actions.setStage(card))
        navigation('/stage')
    }

    useEffect(()=>{
        if(!card.allow_unauthenticated && !isAuthenticate){
            setDisabled(true)
        }else if(!active  && isAuthenticate){
            setDisabled(true)
        }
    },[])

    return (
        <div className={ClassNames(cls.testCard, {[cls.disabled]: card.disabled}, [className])}>
            <img src={card.img ?? Image} alt="" className={ClassNames(cls.img, {[cls.disabled]: card.disabled}, [])}/>
            <div className={cls.block}>
                <h2 className={cls.title}>
                    {card.title}
                </h2>
                <p className={cls.text}>
                    {card.description}
                </p>
            </div>
            <SmallButton 
                disabled={disabled} 
                theme={SmallButtonTheme.DARK} 
                onClick={()=>ClickHandler()}
                className={ClassNames(cls.button, {}, [])} 
            >
                Начать
            </SmallButton>
        </div>
 );
}