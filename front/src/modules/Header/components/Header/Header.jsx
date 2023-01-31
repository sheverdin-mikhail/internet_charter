import React from 'react'
import { ClassNames } from '../../../../helpers/ClassNames/ClassNames'
import { HeaderTitle } from '../../UI/HeaderTitle/HeaderTitle'
import { HeaderNavigation } from '../HeaderNavigation/HeaderNavigation'
import { HeaderSocial } from '../HeaderSocial/HeaderSocial'
import cls from './Header.module.css'

export const Header = () => {
  return (
    <header className={ClassNames(cls.header, {}, ['container'])}>
        <HeaderTitle>
          Интернет-грамота
        </HeaderTitle>
        <HeaderNavigation />
        <HeaderSocial />
    </header>
  )
}
