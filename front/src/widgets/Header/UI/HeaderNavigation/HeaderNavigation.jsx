import React from 'react'
import { CustomLink } from '../../../../shared/UI/CustomLink/CustomLink'
import cls from './HeaderNavigation.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { SmallButton, SmallButtonTheme } from 'shared/UI/SmallButton/SmallButton'
import { UserSlice } from 'entities/User'
import { useNavigate } from 'react-router'
import { ClassNames } from 'shared/lib/ClassNames/ClassNames'
import { HeaderSocial } from '../HeaderSocial/HeaderSocial'


export const HeaderNavigation = (props) => {
  const { className, linkClick, ...otherProps } = props
  const { isAuthenticate, role } = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const LogoutHandler = () => {
    dispatch(UserSlice.actions.logout())
    linkClick()
    navigate('/')
  }
  return (
    <nav className={ClassNames(cls.nav, {}, [className])} {...otherProps}>
        <HeaderSocial className={'_mob'} />
        <CustomLink onClick={linkClick}  theme="header" className={cls.link} to='/'>Главная</CustomLink>
        <CustomLink onClick={linkClick}  theme="header" className={cls.link} to='/profile'>Профиль</CustomLink>
        {
          role==='user' 
            ?
            <>
              <CustomLink onClick={linkClick}  theme="header" className={cls.link} to='/progress'>Достижения</CustomLink>
              <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to={'/tests'}>Испытания</CustomLink>
              <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to={'/for-parents'}>Для родителей</CustomLink>
            </>
            :
            role === 'student'
            ?
            <>
            <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to='/account'>Личный кабинет</CustomLink>
            <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to='/account/tests'>Тесты</CustomLink>
            </>
            :
            role === 'teacher'
            ?
            <>
              <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to='/account'>Личный кабинет</CustomLink>
              <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to='/account/tests'>Тесты</CustomLink>
              <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to='/account/my-tests'>Мои тесты</CustomLink>
              <CustomLink onClick={linkClick}  theme="header" className={ClassNames(cls.link, {}, ['_mob'])} to='/account/results'>Результаты</CustomLink>
            </>
            :
            null  
        }
        
        {
          isAuthenticate && <SmallButton 
            theme={SmallButtonTheme.LIGHT} 
            onClick={LogoutHandler} 
            className={cls.link}
          >
            Выход
          </SmallButton> 
        }
    </nav>
  )
}
