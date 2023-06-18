import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './Button.module.css';

export const ButtonTheme = {
  DARK: 'dark',
  LIGHT: 'light',
  CLEAR: 'clear',
  // LIGHT_THIN: 'light_thin'
}

export const Button = (props) => {
  const { 
    className,
    children,
    theme=ButtonTheme.LIGHT,
    disabled=false,
    ...otherProps
  } = props;

  return (
    <button 
      className={ClassNames(cls.btn, {[cls.disabled]: disabled}, [className, cls[theme]])} 
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
 );
}