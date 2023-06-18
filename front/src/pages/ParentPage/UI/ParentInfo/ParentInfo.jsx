import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './ParentInfo.module.css';
import { CardInfo } from 'widgets/CardInfo/CardInfo';
import IconVKSmall from 'shared/UI/IconVKSmall/IconVKSmall';
import IconJoystick from 'shared/UI/IconJoystick/IconJoystick';

export const ParentInfo = (props) => {
    const { className } = props;

    const parentInfo = [
        {
            id: 1,
            title: 'Социальные сети',
            text: 'Необходимо объяснить ребенку, что общаться с незнакомцами опасно. Они будут пытаться завладеть личной информацией и использовать ее в плохих целях.',
            icon: < IconVKSmall className={cls.icon} />
        },
        {
            id: 2,
            title: 'Видео-игры',
            text: 'Ребенку необходимо узнать, что видео-игры бывают платные и прежде, чем вводить данные банковской карты родителей, необходимо спросить у них разрешение на покупку',
            icon: < IconJoystick className={cls.icon} />
        },
        {
            id: 3,
            title: 'Социальные сети',
            text: 'Необходимо объяснить ребенку, что общаться с незнакомцами опасно. Они будут пытаться завладеть личной информацией и использовать ее в плохих целях.',
            icon: < IconVKSmall className={cls.icon} />
        }
    ]


    return (
        <div className={ClassNames(cls.parentInfo, {}, [className])}>
            {
                parentInfo.map(({title, text, icon, id})=>(
                    <CardInfo 
                        key={id} 
                        title={`${id}. ${title}`} 
                        text={text}
                        icon={icon}
                    />
                ))
            }
        </div>
 );
}