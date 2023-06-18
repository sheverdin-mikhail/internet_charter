import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './BurgerButton.module.css';

export const BurgerButton = (props) => {
    const { className, active, ...otherProps } = props;

    return (
        <button className={ClassNames(cls.burgerButton, {[cls.active]: active}, [className ?? ''])} {...otherProps}>
            <span className={ClassNames(cls.stick, {[cls.active]: active}, [className ?? ''])}></span>
        </button>
    );
}