import React from 'react'
import { CustomLink } from 'shared/UI/CustomLink/CustomLink'
import cls from './MainNavigation.module.css'
import { useSelector } from 'react-redux'

export const MainNavigation = () => {

  const { role } = useSelector(state=>state.user)


  return (
    <nav className={cls.nav}>

      {
        role === 'student'
        ?
        <>
          <CustomLink className={cls.link} theme="button" to='/account'>Личный кабинет</CustomLink>
          <CustomLink className={cls.link} theme="button" to='/account/tests'>Тесты</CustomLink>
        </>
        :
        role === 'teacher'
        ?
        <>
          <CustomLink className={cls.link} theme="button" to='/account'>Личный кабинет</CustomLink>
          <CustomLink className={cls.link} theme="button" to='/account/tests'>Тесты</CustomLink>
          <CustomLink className={cls.link} theme="button" to='/account/my-tests'>Мои тесты</CustomLink>
          <CustomLink className={cls.link} theme="button" to='/account/results'>Результаты</CustomLink>
        </>
        :
        <>
          <CustomLink className={cls.link} theme="button" to='/tests'>Испытания</CustomLink>
          <CustomLink className={cls.link} theme="button" to='/for-parents'>Для родителей</CustomLink>
        </>
      }
        
    </nav>
  )
}
