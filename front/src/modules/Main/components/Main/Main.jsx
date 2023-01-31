import React from 'react'
import { ClassNames } from '../../../../helpers/ClassNames/ClassNames'

import c from './Main.module.css'


export const Main = ({children}) => {
  return (
    <main className={ClassNames(c.main, {}, ['container'])}>
        {children}
    </main>
  )
}
