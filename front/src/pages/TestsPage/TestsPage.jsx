import React, { useEffect } from 'react'
import { Main, MainNavigation } from '../../widgets/Main'
import { TestCard } from 'widgets/TestCard/TestCard'
import cls from './TestsPage.module.css'
import { testsApi } from 'entities/Tests'
import { Loader } from 'shared/UI/Loader/Loader'


export const TestsPage = () => {


  // const { data: stages, isLoading, isError, error } = testsApi.useFetchAllStagesQuery({refetchOnFocus: true})
  // const { data: completedStages } = testsApi.useFetchCompletedStagesQuery()
  const [fetchStages, { data: stages, isLoading, isError, error }] = testsApi.useLazyFetchAllStagesQuery({refetchOnFocus: true})
  const [fetchCompletedStages, { data: completedStages }] = testsApi.useLazyFetchCompletedStagesQuery()


  useEffect(()=>{
    fetchStages()
    fetchCompletedStages()
  },[])

  return (
    <Main>
      <MainNavigation />
      <div className={cls.content}>
        {
         isLoading
         ?
         <Loader />
         :
         isError
         ?
         <span>{error.data.detail ?? ''}</span>
         :
          stages && stages.map((card, index) => (
            <TestCard  
              className={cls.card} 
              active={completedStages && completedStages.length  >= index} 
              card={card} 
              key={`TestCard_${card.id}`}
            />
          ))
        }
      </div>
    </Main>
  )
}
