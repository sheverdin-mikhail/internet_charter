import React, { useState } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './Select.module.css';
import { ReactComponent as Arrow} from 'shared/assets/icons/arrow-top.svg'
import { useDispatch } from 'react-redux';
import { NewQuestionCreateSlice } from 'entities/NewQuestionCreate';


export const Select = (props) => {
    const { className, options, activeOption } = props;
    const [active, setActive] = useState(false)

    const dispatch = useDispatch()


    function toggleHandler(e){
        setActive(!active)
    }

    function sortOptions(a, b){
        if (a.value === activeOption) {
            return -1; // a должно быть раньше b
          } else if (b.value === activeOption) {
            return 1; // b должно быть раньше a
          } else {
            return 0; // порядок не важен
          }
    }

    function choseOptionHandler(e, value, index){
        if(active && index !== 0){
            dispatch(NewQuestionCreateSlice.actions.setQuestionType(value))
            setActive(!active)
        }
    }

        

    return (
        <div className={ClassNames(cls.select, {[cls.active]: active}, [className])} onClick={e=>toggleHandler(e)}>
            <div className={cls.options}>
                {
                    options.sort((a,b) => sortOptions(a, b)).map(({label, value}, index)=>(
                        <div key={value} className={ClassNames(cls.option, {}, [])} onClick={e=>choseOptionHandler(e, value, index)}>
                            {label}
                            <Arrow className={cls.icon }/>
                        </div>
                    ))
                }
            </div>
        </div>
 );
}