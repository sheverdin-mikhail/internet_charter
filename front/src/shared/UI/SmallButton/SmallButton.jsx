import React from 'react';
import cls from './SmallButton.module.css';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';

export const SmallButtonTheme = {
    DARK: 'dark',
    LIGHT: 'light',
    CLEAR: 'clear',
    // LIGHT_THIN: 'light_thin'
  }
  


export const SmallButton = (props) => {
    const { 
        className,
        children,
        theme=SmallButtonTheme.LIGHT,
        disabled=false,
        ...otherProps
      } = props;
    
    return (
        <button className={ClassNames(cls.btn, {[cls.disabled]: disabled}, [className, cls[theme]])} 
        disabled={disabled}
        {...otherProps}>
            {children}
        </button>
 );
}