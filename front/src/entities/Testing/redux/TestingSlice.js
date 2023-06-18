import { TestingResult } from "features/TestingResult/TestingResult"
import { questionTypes } from "shared/models/TestModels"

const { createSlice } = require("@reduxjs/toolkit")


export const TestingTypes = {
    VIEW: 'view',
    STUDENT_TESTING: 'student_testing',
    USER_TESTING: 'user_testing',
    RESULTS: 'results',
    ONE_TASK_VIEW: 'one_task_view'
}


const initialState = {
    test: {
    },
    result: {},
    activeTask: '',
    testingType: TestingTypes.VIEW,
    taskIndex: 0

}


export const TestingSlice = createSlice({
    initialState: initialState,
    name: 'testing',
    reducers: {
        openTesting(state, action){
            state.test = action.payload.test
            state.testingType = action.payload.type
            state.activeTask = action.payload.activeTask ?? state.test.tasks[0] 
            state.taskIndex = action.payload.taskIndex ?? 0
        },
        nextTask(state){
            if(state.taskIndex < state.test.tasks.length){
                state.activeTask = state.test.tasks[state.taskIndex+1]
                state.taskIndex += 1
            }
        },
        prevTask(state){
            if(state.taskIndex > 0){
                state.activeTask = state.test.tasks[state.taskIndex-1]
                state.taskIndex -=1
            }
        },
        setAnswer(state, action){
            if (state.activeTask && state.activeTask.type===questionTypes.RADIO){
                state.activeTask.answers.forEach(answer => answer.value = false)
                state.activeTask.answers.find(answer => answer.id === action.payload.id).value = true
            }else if(state.activeTask && state.activeTask.type===questionTypes.CHECKBOX){
                const prev_value = state.activeTask.answers.find(answer => answer.id === action.payload.id).value
                state.activeTask.answers.find(answer => answer.id === action.payload.id).value = !prev_value
            }else if(state.activeTask && state.activeTask.type===questionTypes.TEXT){
                state.activeTask.answers.forEach(answer => answer.value = action.payload.value)
            }
        },
        saveAnswers(state){
            state.test.tasks.find(({id}) => id === state.activeTask.id).answers = state.activeTask.answers
        },
        
        showResults(state){
            state.testingType = TestingTypes.RESULTS
            state.activeTask = state.test.tasks[0]
            state.taskIndex = 0
            
        },
        finishTest(state){
            state.result = TestingResult(state.test)
        },
        clearTesting(state){
            state.test = null
            state.result = null
            state.activeTask = null
            state.testingType = TestingTypes.VIEW
        
        }

    }
})