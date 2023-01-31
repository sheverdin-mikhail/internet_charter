import React from 'react'
import { NavLink } from 'react-router-dom'
import cls from './ButtonLink.module.css'

export const ButtonLink = ({children, to, ...props}) => {
  return (
    <NavLink className={cls.btn} to={to} {...props}>
      {children}
    </NavLink>
  )
}
