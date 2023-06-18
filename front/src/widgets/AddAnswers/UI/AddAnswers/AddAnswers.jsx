import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './AddAnswers.module.css';
import { AddTextAnswers } from '../AddTextAnswers/AddTextAnswers';
import { AddCheckboxAnswers } from '../AddCheckboxAnswers/AddCheckboxAnswers';
import { AddRadioAnswers } from '../AddRadioAnswers/AddRadioAnswers';
import { questionTypes } from 'shared/models/TestModels';

export const AddAnswers = (props) => {
    const { className, questionType } = props;

    return (
        <div className={ClassNames(cls.addAnswers, {}, [className])}>
            {
                questionType === questionTypes.TEXT
                ?
                <AddTextAnswers />
                :
                questionType === questionTypes.CHECKBOX
                ?
                <AddCheckboxAnswers />
                :
                <AddRadioAnswers />
            }
        </div>
 );
}