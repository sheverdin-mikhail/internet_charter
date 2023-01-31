import React from 'react'
import { Outlet } from 'react-router'
import { Footer } from '../../modules/Footer'
import { Header } from '../../modules/Header'

export const Layout = () => {
  return (
    <div className='wrapper'>
     <Header />  
     <Outlet />   
     <Footer />   
    </div>
  )
}
