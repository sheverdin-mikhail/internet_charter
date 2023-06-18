import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TestingTablePopup.module.css';
import { PopupBoard } from 'widgets/PopupBoard/PopupBoard';
import { PopupNavigation } from '../PopupNavigation/PopupNavigation';
import { TestingTable } from 'widgets/TestingTable';
import { useSelector } from 'react-redux';

export const TestingTablePopup = (props) => {

    const { className } = props;
    const { activeTask, testingType, taskIndex } = useSelector(state => state.testing)


    return (
        <PopupBoard className={ClassNames(cls.testingTablePopup, {}, [className])}>
            <PopupNavigation />
            <TestingTable task={activeTask} taskIndex={taskIndex} testingType={testingType} />
        </PopupBoard>
 );
}