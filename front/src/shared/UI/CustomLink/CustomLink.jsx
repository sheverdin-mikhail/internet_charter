import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './CustomLink.module.css';
import { Link, useLocation } from 'react-router-dom';



export const LinkThemes  = {
  SIMPLE: 'simple',
  BUTTON: 'button',
  BUTTON_DARK: 'button_dark',
  HEADER: 'header',
  FOOTER: 'footer',
}


export const CustomLink = (props) => {
  const location = useLocation()

  const { 
    className,
    to,
    theme=LinkThemes.SIMPLE,
    disabled,
    children,
    ...otherProps
  
  } = props;

  

  return (
    <Link 
    to={to} 
    disabled={disabled}
    className={
      ClassNames(
        cls.CustomLink, 
        {
          [cls.active]: location.pathname===to,
          [cls.disabled]: disabled

        }, 
        [className, cls[theme]]
      )
    }
    {...otherProps}
    >
        {children}
    </Link>
  )

}