import React from 'react'
import CustomLink from '../../../../UI/CustomLink/CustomLink'
import cls from './HeaderNavigation.module.css'


export const HeaderNavigation = () => {
  return (
    <nav className={cls.nav}>
        <CustomLink classes={[cls.link]} active to='/'>Главная</CustomLink>
        <CustomLink classes={[cls.link]} to='/progress'>Достижения</CustomLink>
        <CustomLink classes={[cls.link]} to='/profile'>Профиль</CustomLink>
    </nav>
  )
}
