import React from 'react'
import FooterTitle from '../../UI/FooterTitle/FooterTitle'
import FooterLinks from '../FooterLinks/FooterLinks'
import FooterSocial from '../FooterSocial/FooterSocial'
import cls from './FooterNavigation.module.css'

const FooterNavigation = () => {
  return (
    <nav className={cls.nav}>
        <FooterTitle to={'/'}>Интернет-Грамота</FooterTitle>
        <FooterLinks className={cls.links} />
        <FooterSocial />
    </nav>

  )
}

export default FooterNavigation