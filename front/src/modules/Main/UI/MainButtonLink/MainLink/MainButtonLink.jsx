import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import cls from './MainButtonLink.module.css'

export const MainButtonLink = ({children, to, ...props}) => {
  return (
    <NavLink className={cls.btn} to={to} {...props}>
      {children}
    </NavLink>
  )
}
