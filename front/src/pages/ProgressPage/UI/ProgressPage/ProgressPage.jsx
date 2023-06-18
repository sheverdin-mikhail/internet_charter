import { testsApi } from 'entities/Tests'
import React, { useEffect } from 'react'
import { Loader } from 'shared/UI/Loader/Loader'
import { Main, MainNavigation } from 'widgets/Main'
import cls from './ProgressPage.module.css'
import { ReactComponent as ActiveMedal } from 'shared/assets/icons/active-medal-icon.svg'
import { ReactComponent as UnactiveMedal } from 'shared/assets/icons/unactive-medal-icon.svg'
import { useSelector } from 'react-redux'
import { Certificate } from 'widgets/Certificate/Certificate'


export const ProgressPage = () => {

  const [fetchStages, { data: stages, isLoading, isError, error }] = testsApi.useLazyFetchAllStagesQuery({refetchOnFocus: true})
  const [fetchCompletedStages, { data: completedStages }] = testsApi.useLazyFetchCompletedStagesQuery()

  const { certificate, secondName, firstName } = useSelector(state => state.user)

  useEffect(()=>{
    fetchStages()
    fetchCompletedStages().then(res => console.log(res))
    console.log(completedStages)
  },[completedStages, stages])


  return (
    <Main isPrivate={true} className={cls.progressPage} >
      <MainNavigation />
        <div className={cls.content}>
          <h2 className={cls.subtitle}>Проходи испытания, собирай награды и получи именной сертификат!</h2>
          <div className={cls.medals}>
            {
            isLoading
            ?
            <Loader />
            :
            isError
            ?
            <span>{error.data.detail ?? ''}</span>
            :
              stages && stages.map((stage) => (
                completedStages && completedStages.find(({id}) => id === stage.id) 
                ? <ActiveMedal className={cls.medal} key={`medalIcon_${stage.id}`}/> 
                : <UnactiveMedal className={cls.medal} key={`medalIcon_${stage.id}`}/>
              ))
            }
          </div>
          <p className={cls.text}>Твой сертификат:</p>
          <div className={cls.imgContainer}>
            <Certificate name={`${secondName} ${firstName}`} disabled={!certificate} />
          </div>
        </div>
    </Main>
  )
}
