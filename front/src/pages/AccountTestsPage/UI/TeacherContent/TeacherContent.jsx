import React from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './TeacherContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { TestCardsList } from 'widgets/TestCardsList/TestCardsList';
import { NotFoundResults } from 'pages/AccountPage/UI/NotFoundResults/NotFoundResults';
import { testsApi } from 'entities/Tests';
import { Loader } from 'shared/UI/Loader/Loader';
import { Button, ButtonTheme } from 'shared/UI/Button/Button';
import { useNavigate } from 'react-router';
import { TestCreationSlice } from 'entities/TestCreation';

export const TeacherContent = (props) => {
    const { className } = props;

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { role } = useSelector(state=>state.user)


    const { data, isLoading } = testsApi.useFetchTestsQuery({role: role, custom: 'false'})

    function ClickHandler(){
        navigate('/account/create-test')
        dispatch(TestCreationSlice.actions.clearTestCreation())
    }

    return (
        <div className={ClassNames(cls.teacherContent, {}, [className])}>
            {
                !isLoading
                    ?
                    data && data.length > 0
                        ?
                        <TestCardsList tests={data} />
                        :
                        <NotFoundResults title={"Мои тесты:"} description={"Тесты не были найдены"} />
                    :
                    <Loader />
            }
            <Button onClick={()=>ClickHandler()} theme={ButtonTheme.LIGHT} className={cls.button}>Создать свой тест</Button>

        </div>
 );
}