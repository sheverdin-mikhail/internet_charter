import React from 'react'
import c from './HeaderTitle.module.css'
import { Link } from 'react-router-dom'


export const HeaderTitle = ({children, to}) => {
  return (
    <Link to={to} className={c.HeaderTitle}>{children}</Link>
  )
}
