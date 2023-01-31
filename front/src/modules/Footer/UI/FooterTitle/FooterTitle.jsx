import React from 'react'
import cls from './FooterTitle.module.css'


const FooterTitle = ({children}) => {
  return (
    <h2 className={cls.title}>{children}</h2>
  )
}

export default FooterTitle