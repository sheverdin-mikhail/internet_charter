import React from 'react'
import { Outlet, useLocation } from 'react-router'
import { Footer } from '../../widgets/Footer'
import { Header } from '../../widgets/Header'
import { ClassNames } from 'shared/lib/ClassNames/ClassNames'

export const Layout = () => {

  const location = useLocation()

  return (
    <div 
      className={ClassNames(
        'wrapper', 
        {
          robotBg: location.key === 'default',
          progressBg: location.pathname === '/progress'
        }, 
        [])
      }>
     <Header />  
     <Outlet />
     <Footer />   
    </div>
  )
}
