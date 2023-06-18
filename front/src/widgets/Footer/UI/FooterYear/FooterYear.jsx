import React from 'react'
import cls from './FooterYear.module.css'


const FooterYear = ({children}) => {
  return (
    <p className={cls.year}>{children}</p>
  )
}

export default FooterYear