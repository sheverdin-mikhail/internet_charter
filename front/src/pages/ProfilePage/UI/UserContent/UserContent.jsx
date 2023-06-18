import React from 'react'
import { Main } from 'widgets/Main'
import { ProfileForm } from '../ProfileForm/ProfileForm'
import cls from './UserContent.module.css'
import { AddAvatarButton } from 'features/AddAvatarButton/AddAvatarButton'

export const UserContent = () => {

 
  return (
    <Main>
      <div className={cls.ProfilePage}>
        <div className={cls.row}>
          <AddAvatarButton />
          <ProfileForm className={cls.form} />
        </div>
      </div>
    </Main>
  )
}
