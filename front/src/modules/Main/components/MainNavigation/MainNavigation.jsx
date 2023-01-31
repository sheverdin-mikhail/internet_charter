import React from 'react'
import { ButtonLink } from '../../../../UI/ButtonLink/ButtonLink/ButtonLink'
import { MainLink } from '../../UI/MainLink/MainLink'
import cls from './MainNavigation.module.css'

export const MainNavigation = () => {
  return (
    <nav className={cls.nav}>
        <ButtonLink to='/tests'>Испытания</ButtonLink>
        <MainLink to='/for-parents'>Для родителей</MainLink>
        <MainLink to='/for-teachers'>Для учителей</MainLink>
    </nav>
  )
}
