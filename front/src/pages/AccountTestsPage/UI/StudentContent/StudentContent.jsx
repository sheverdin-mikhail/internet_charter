import React, { useEffect } from 'react';
import { ClassNames } from 'shared/lib/ClassNames/ClassNames';
import cls from './StudentContent.module.css';
import { NotFoundResults } from 'pages/AccountPage/UI/NotFoundResults/NotFoundResults';
import { useSelector } from 'react-redux';
import { TestCardsList } from 'widgets/TestCardsList/TestCardsList';
import { testsApi } from 'entities/Tests';
import { Loader } from 'shared/UI/Loader/Loader';

export const StudentContent = (props) => {
    const { className } = props;
    const { role } = useSelector(state=>state.user)


    const [ fetchTests, { data, isLoading } ] = testsApi.useLazyFetchTestsQuery({
        "role": role
    })
    

    useEffect(() => {
        fetchTests({
            "role": role
        })
    }, [])

    return (
        <div className={ClassNames(cls.studentContent, {}, [className])}>
             {
                !isLoading
                    ?
                    data && data.length > 0
                        ?
                        <TestCardsList tests={data}  />
                        :
                        <NotFoundResults title={"Доступные тесты:"} description={"Тесты не найдены"} />
                    :
                    <Loader />
            }
        </div>
 );
}