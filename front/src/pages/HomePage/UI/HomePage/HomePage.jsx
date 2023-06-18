import React, { useEffect } from 'react'
import { Main, MainNavigation } from 'widgets/Main'
import { Button } from 'shared/UI/Button/Button'
import cls from './HomePage.module.css'
import { HomeBorder } from '../../UI/HomeBorder/HomeBorder'
import { useDispatch, useSelector } from 'react-redux'
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice'


export const HomePage = () => {


  const dispatch = useDispatch()
  const { isAuthenticate } = useSelector(state=>state.user)




  return (
    <Main className={cls.homeMain}>
      <MainNavigation /> 
      <div className={cls.block}>
        <HomeBorder />
        {
          !isAuthenticate &&  <Button className={cls.btn} onClick={()=>dispatch(PopupsSlice.actions.showPopup(PopupNames.SIGNIN))}>
            Зарегистрироваться / Войти
          </Button> 
        }
       
      </div>
    </Main>
  )
}
