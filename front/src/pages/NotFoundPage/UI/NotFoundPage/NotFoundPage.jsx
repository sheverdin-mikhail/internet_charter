import React from 'react'
import { Main } from 'widgets/Main'
import Robot from 'shared/assets/img/robot.png'
import cls from './NotFoundPage.module.css'

export const NotFoundPage = () => {
  return (
    <Main>
      <p className={cls.text}>
        Что-то пошло не так! Страница, которую вы спрашиваете, не существует. 
        Возможно, она была удалена, или вы набрали неверный адрес. 
      </p>
      <img src={Robot} alt="" className={cls.robot} />
    </Main>
  )
}
