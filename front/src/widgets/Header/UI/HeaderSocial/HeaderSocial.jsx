import React from 'react'
import { CustomLink } from '../../../../shared/UI/CustomLink/CustomLink'
import IconTG from '../../../../shared/UI/IconTG/IconTG'
import IconVK from '../../../../shared/UI/IconVK/IconVK'
import cls from './HeaderSocial.module.css'
import { ClassNames } from 'shared/lib/ClassNames/ClassNames'


export const HeaderSocial = (props) => {

  const { className } = props

  return (
    <div className={ClassNames(cls.social, {}, [className])}>
        <CustomLink to='https://vk.com/lisooooooo'  className={cls.link}>
          <IconVK className={cls.icon} size={'28px'} />
        </CustomLink>
        <CustomLink to='https://t.me/li_sa_s'  className={cls.link}>
          <IconTG className={cls.icon} size={'22.61px'} />
        </CustomLink>
    </div>
  )
}
