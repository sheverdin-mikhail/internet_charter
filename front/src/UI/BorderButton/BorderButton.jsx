import React from 'react'
import { ClassNames } from '../../helpers/ClassNames/ClassNames'
import cls from './BorderButton.module.css'


const BorderButton = ({children, dark, ...props}) => {


  return (
    <button className={ClassNames(cls.btn, {}, [dark ? cls.dark : cls.light])} {...props}>
      {children}
    </button>
  )
}
export default BorderButton