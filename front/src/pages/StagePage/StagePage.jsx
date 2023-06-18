import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import './StagePage.css';
import { Main, MainNavigation } from 'widgets/Main';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/UI/Button/Button';
import { useNavigate } from 'react-router';
import { TestsSlice } from 'entities/Tests';
import { TestingSlice } from 'entities/Testing';
import { TestingTypes } from 'entities/Testing/redux/TestingSlice';

export const StagePage = (props) => {
    const { className } = props;

    const { stage } = useSelector(state => state.tests)

    const navigation = useNavigate()
    const disptach = useDispatch()

    function ClickHandler(){
        disptach(TestingSlice.actions.openTesting({
            test: stage.test,
            type: TestingTypes.USER_TESTING
        }))
        navigation('/testing')
    }

    return (
        <Main className={ClassNames('stagePage', {}, [className])}>
            <MainNavigation />
            <div className='stageInformation' dangerouslySetInnerHTML={{ __html: stage.information }} />
            <Button 
                className={'button'}
                onClick = {() => ClickHandler()}
            >
                Пройти тест по теме: {stage.title} 
            </Button>
        </Main>
 );
}