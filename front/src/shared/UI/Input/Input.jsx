import { ClassNames } from 'shared/lib/ClassNames/ClassNames'
import React from 'react'
import cls from './Input.module.css'


export const InputTheme = {
  BORDER: 'border',
  CLEAR: 'clear'
}

export const Input = (props) => {

  
  const {
    className,
    theme=InputTheme.CLEAR,
    disabled=false,
    ...otherProps
  } = props

  return (
    <input
      className={ClassNames(cls.Input, {[cls.disabled]: disabled}, [className, cls[theme]])} 
      disabled={disabled}
      {...otherProps}
    />
  )
}
