import React, { useEffect } from 'react'
import { ClassNames } from '../../../../shared/lib/ClassNames/ClassNames'

import c from './Main.module.css'
import { PopupNames, PopupsSlice } from 'entities/Popups/redux/PopupsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { userApi } from 'entities/User/api/UserApi'
import { UserSlice } from 'entities/User'


export const Main = (props) => {

  const {children, className, isPrivate=false, ...otherProps} = props

  const { access_token, refresh_token } = useSelector(state=>state.user)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [ fetchUserDetail ]  = userApi.useFetchUserDetailMutation()
  const [ refreshToken ]  = userApi.useRefreshTokenMutation()
  
    //Проверяем при посещении приватных страниц авторизован ли пользователь и действителен ли его access token
    useEffect(()=>{
      fetchUserDetail(access_token)
        .then(res => {
            if(res.error){
              refreshToken({'refresh': refresh_token}).then(res => {
                if(res.data){
                  dispatch(UserSlice.actions.refreshToken(res.data))
                }else if(res.error){
                if(isPrivate){
                  dispatch(UserSlice.actions.logout())
                  dispatch(PopupsSlice.actions.showPopup(PopupNames.SIGNIN))
                  navigate('/')
                }
                }
              })
            }else if(res.data){
              dispatch(UserSlice.actions.setUser(res.data))
            }
          }
        )
    }, [])

  return (
    <main className={ClassNames(c.main, {}, ['container', className])} {...otherProps}>
        {children}
    </main>
  )
}
