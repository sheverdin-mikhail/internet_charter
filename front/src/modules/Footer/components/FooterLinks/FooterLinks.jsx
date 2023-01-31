import React from 'react'
import CustomLink from '../../../../UI/CustomLink/CustomLink'
import cls from './FooterLinks.module.css'

const FooterLinks = () => {
  return (
    <div className={cls.links}>
        <CustomLink classes={[cls.link]} to={'/'}>Главная</CustomLink>
        <CustomLink classes={[cls.link]} to={'/progress'}>Достижения</CustomLink>
        <CustomLink classes={[cls.link]} to={'/profile'}>Профиль</CustomLink>
        <CustomLink classes={[cls.link]} to={'/tests'}>Испытания</CustomLink>
        <CustomLink classes={[cls.link]} to={'/for-parents'}>Для родителей</CustomLink>
        <CustomLink classes={[cls.link]} to={'/for-teachers'}>Для учителей</CustomLink>
    </div>
  )
}

export default FooterLinks