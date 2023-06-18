import React from 'react'
import { Link } from 'react-router-dom'
import cls from './MainLink.module.css'

export const MainLink = ({children, to, ...props}) => {
  return (
    <Link to={to} {...props} className={cls.link}>
        {children}
    </Link>
  )
}
