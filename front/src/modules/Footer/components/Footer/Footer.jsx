import React from 'react'
import { ClassNames } from '../../../../helpers/ClassNames/ClassNames'
import FooterYear from '../../UI/FooterYear/FooterYear'
import FooterNavigation from '../FooterNavigation/FooterNavigation'
import cls from './Footer.module.css'


export const Footer = () => {
  return (
    <footer className={ClassNames(cls.footer, {}, [])}>
      <div className={'container'}>
        <FooterNavigation />
        <FooterYear>
          2023
        </FooterYear>
      </div>
    </footer>
  )
}
