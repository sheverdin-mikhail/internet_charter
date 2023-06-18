import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ChoseRolePopup.module.css';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useDispatch } from 'react-redux';
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice';
import { UserSlice } from 'entities/User';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';

export const ChoseRolePopup = (props) => {


    const { 
        className,
     } = props;

    const dispatch = useDispatch()


    function ClickHandler(popup, role){
        dispatch(PopupsSlice.actions.showPopup(popup))
        dispatch(UserSlice.actions.setRole(role))
    }

    return (
        <div className={ClassNames(cls.chosePopup, {}, [className])}>
            <PopupNavigation />
            <div className={ClassNames(cls.block, {}, [className, cls.firstBlock])}>
                <p className={cls.role}>
                    Я - пользователь
                </p>
                <ul className={cls.list}>
                    <li className={cls.item}>
                        Проходи испытания
                    </li>
                    <li className={cls.item}>
                        Зарабатывай награды
                    </li>
                    <li className={cls.item}>
                        Получай именную грамоту
                    </li>
                </ul>
                <Button theme={ButtonTheme.DARK} className={cls.button} onClick={()=>ClickHandler(PopupNames.SIGNUP, 'user')} >Зарегестрироваться как пользователь</Button>
            </div>
            <div className={ClassNames(cls.block, {}, [className])}>
                <p className={cls.role}>
                    Я - учитель
                </p>
                <ul className={cls.list}>
                    <li className={cls.item}>
                        Скачивай материалы
                    </li>
                    <li className={cls.item}>
                        Создавай викторины
                    </li>
                    <li className={cls.item}>
                        Отслеживай успеваемость
                    </li>
                </ul>
                <Button theme={ButtonTheme.DARK} className={cls.button}  onClick={()=>ClickHandler(PopupNames.SIGNUP, 'teacher')}  >Зарегестрироваться как учитель</Button>
            </div>
        </div>
    );
}