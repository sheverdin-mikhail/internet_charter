import React from 'react'
import { Main, MainNavigation } from '../../../../widgets/Main'
import { ParentInfo } from '../ParentInfo/ParentInfo'
import cls from './ParentPage.module.css'

export const ParentPage = () => {
  return (
    <Main>
      <MainNavigation />
      <h2 className={cls.title}>Дорогой родитель!</h2>
      <p className={cls.description}>Здесь ты найдешь пару советов о том, как научить своего ребенка безопасному использованию Интернета.</p>
      <ParentInfo />
    </Main>
  )
}
