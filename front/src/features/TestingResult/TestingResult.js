import { questionTypes } from "shared/models/TestModels"


export function GetCountCorrectAnsweredQuestions(total, task){

   if(task.type === questionTypes.CHECKBOX || task.type === questionTypes.RADIO){
    const uncorrectTask =  task.answers.find(answer => { 
        if(answer.value){
            if(answer.isCorrect){
                return false
            }else {
                return true
            }
        }
        if(!answer.isCorrect){
            return false
        }
            return true
    })  
    return uncorrectTask ? total : total + 1 //если не нашелся ответ, где не совпадают значения value и isCorrect, то прибавляем 1
   }else if(task.type === questionTypes.TEXT){
    if(task.answers[0].value?.length > 0){
        const correctAnswers = task.answers.filter(answer => answer.text.replace(/\s/g, '') === answer.value.replace(/\s/g, ''))
        return correctAnswers.length > 0 ? total+1 : total  //если нашелся ответ, где не совпадают значения value и text, то прибавляем 1
    }else {
        return total  //если нашелся ответ, где не совпадают значения value и text, то прибавляем 1
    }
   }
   
}


export function TestingResult(test){
    const tasks = test.tasks
    const correctAnweredQuestions = tasks.reduce((total, task)=>GetCountCorrectAnsweredQuestions(total, task), 0)
    const totalQuestions = tasks.length
    const percent = correctAnweredQuestions / totalQuestions * 100

    return {
        testId: test.id,
        correctAnweredQuestions,
        totalQuestions,
        percent: Math.floor(percent)
    }
}