import React from 'react'
import cls from './CustomInput.module.css'


const CustomInput = ({type, placeholder}) => {
  return (
    <input className={cls.input} type={type||'text'} placeholder={placeholder} />
  )
}

export default CustomInput