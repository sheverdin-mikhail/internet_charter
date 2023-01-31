import React from 'react'
import { MainButtonLink } from '../../UI/MainButtonLink/MainLink/MainButtonLink'
import { MainLink } from '../../UI/MainLink/MainLink'
import cls from './MainNavigation.module.css'

export const MainNavigation = () => {
  return (
    <nav className={cls.nav}>
        <MainButtonLink to='/tests'>Испытания</MainButtonLink>
        <MainLink to='/for-parents'>Для родителей</MainLink>
        <MainLink to='/for-teachers'>Для учителей</MainLink>
    </nav>
  )
}
