import React, { useEffect, useRef, useState } from 'react'
import { ClassNames } from 'shared/lib/ClassNames/ClassNames'
import { HeaderTitle } from '../HeaderTitle/HeaderTitle'
import { HeaderNavigation } from '../HeaderNavigation/HeaderNavigation'
import { HeaderSocial } from '../HeaderSocial/HeaderSocial'
import cls from './Header.module.css'
import { BurgerButton } from 'shared/UI/BurgerButton/BurgerButton'

export const Header = () => {


  const [ btnActive, setBtnActive ] = useState(false)


  useEffect(()=>{
    if(btnActive){
      document.body.style.overflow = 'hidden'
    }else {
      document.body.style.overflow = 'auto'
    }
  }, [btnActive])


  return (
    <header className={ClassNames(cls.header, {}, ['container'])}>
        <HeaderTitle to='/'>
          Интернет-грамота
        </HeaderTitle>
        <HeaderNavigation className={ClassNames(cls.nav, {[cls.hidden]: !btnActive}, [])} linkClick = {()=>{
          if(btnActive){
            setBtnActive(false)
          }
        }}/>
        <HeaderSocial className={ClassNames(cls.social, {}, [])} />
        <BurgerButton 
          active={btnActive}  
          className={cls.burgerButton} 
          onClick={()=>setBtnActive(prev=>!prev)}
        />

    </header>
  )
}
