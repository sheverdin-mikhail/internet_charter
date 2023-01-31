import React from 'react'
import CustomLink from '../../../../UI/CustomLink/CustomLink'
import IconTG from '../../../../UI/IconTG/IconTG'
import IconVK from '../../../../UI/IconVK/IconVK'
import cls from './HeaderSocial.module.css'


export const HeaderSocial = () => {
  return (
    <div className={cls.social}>
        <CustomLink to='https://vk.com/go0d_m0od'>
          <IconVK className={cls.icon} color={'#480660'} size={'28px'} />
        </CustomLink>
        <CustomLink to='https://t.me/sheverdin_mikhail'>
          <IconTG className={cls.icon} color={'#480660'} size={'22.61px'} />
        </CustomLink>
    </div>
  )
}
