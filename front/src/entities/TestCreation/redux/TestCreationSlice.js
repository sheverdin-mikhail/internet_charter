import { createSlice } from '@reduxjs/toolkit'

const initiatlState = {
    name: '',
    tasks: [],
    activeTestCategory: '',
    isEdit: false
}


export const TestCreationSlice = createSlice({
    initialState: initiatlState,
        name: 'testCreation',
        reducers: {
            addCustomQuestion(state, action){
                state.tasks.push({
                    id: Math.random().toString(36).substr(2, 9),
                    type: action.payload.type,
                    question: action.payload.question,
                    answers: action.payload.answers,
                    isPersonal: true,
                    fromApi: action.payload.fromApi
                },)
            },
            saveEditionQuestion(state, action){
                const task = state.tasks.find(task => task.id === action.payload.id)
                task.question = action.payload.question
                task.answers = action.payload.answers
                task.type = action.payload.type
            },
            deleteTaskFromList: (state, action) => {
                const index = state.tasks.findIndex(task => task.id === action.payload);
                if (index !== -1) {
                  state.tasks.splice(index, 1);
                }
            },
            setActiveTestCategory(state, action){
                state.activeTestCategory = action.payload
            },
            addQuestionToTasks(state, action){
                if(!state.tasks.find(task => task.id === action.payload.id)){
                    state.tasks.push({ fromApi: true, ...action.payload})
                }
            },
            setTestName(state,action){
                state.name = action.payload
            },
            clearTestCreation(state){
                state.name = ''
                state.tasks = []
                state.activeTestCategory = ''
                state.isEdit= false

            },
            setTest(state, action){
                state.name = action.payload.title
                state.tasks = action.payload.tasks
                state.id = action.payload.id
                state.isEdit = true
            }
        }
})