import React from 'react'
import { ClassNames } from '../../../../helpers/ClassNames/ClassNames'

import c from './Main.module.css'


export const Main = ({children, classes=[], ...props}) => {
  return (
    <main className={ClassNames(c.main, {}, ['container', ...classes])}>
        {children}
    </main>
  )
}
