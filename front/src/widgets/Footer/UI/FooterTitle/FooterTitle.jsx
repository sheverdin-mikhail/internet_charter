import React from 'react'
import cls from './FooterTitle.module.css'
import { Link } from 'react-router-dom'


const FooterTitle = ({children, to}) => {
  return (
    <Link to={to} className={cls.title}>{children}</Link>
  )
}

export default FooterTitle