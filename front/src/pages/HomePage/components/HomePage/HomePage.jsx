import React from 'react'
import { Main, MainNavigation } from '../../../../modules/Main'
import BorderButton from '../../../../UI/BorderButton/BorderButton'
import { HomeBorder } from '../../UI/HomeBorder/HomeBorder'
import cls from './HomePage.module.css'


export const HomePage = () => {
  return (
    <Main classes={[cls.homeMain]}>
      <MainNavigation /> 
      <div className={cls.block}>
        <HomeBorder />
        <BorderButton classes={[cls.btn]}>
          Зарегистрироваться / Войти
        </BorderButton> 
      </div>
    </Main>
  )
}
