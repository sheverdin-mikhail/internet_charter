import React from 'react'
import c from './HeaderTitle.module.css'


export const HeaderTitle = ({children}) => {
  return (
    <h1 className={c.HeaderTitle}>{children}</h1>
  )
}
