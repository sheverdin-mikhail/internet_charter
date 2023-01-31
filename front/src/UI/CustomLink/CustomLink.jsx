import React from 'react'
import { Link } from 'react-router-dom'
import { ClassNames } from '../../helpers/ClassNames/ClassNames'
import cls from './CustomLink.module.css'


const CustomLink = ({children, to, active, classes, ...props}) => {


  return (
    <Link to={to} className={ClassNames(cls.link, {isActive: active}, [classes])} {...props}>
        {children}
    </Link>
  )
}

export default CustomLink