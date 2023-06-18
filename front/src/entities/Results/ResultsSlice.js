import { createSlice } from '@reduxjs/toolkit'

const initiatlState = {
    results: [
        {
            id: 1,
            fio: "Иванов Иван",
            value: '4/5',
            date: '22.02.23'
        },
        {
            id: 2,
            fio: "Косов Игнат",
            value: '4/5',
            date: '22.02.23'
        },
        {
            id: 3,
            fio: "Гончарова Марина",
            value: '4/5',
            date: '22.02.23'
        },
    ],
    activeTestsFilter: '',
    activeClassFilter: ''
}


export const ResultsSlice = createSlice({
    initialState: initiatlState,
        name: 'results',
        reducers: {
            setActiveClassFilter(state, action){
                state.activeClassFilter = action.payload
            },
            setActiveTestsFilter(state, action){
                state.activeTestsFilter = action.payload
            },
            clearClassFilter(state){
                state.activeClassFilter = ""
            }
        }
})