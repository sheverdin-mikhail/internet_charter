import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    results: [
        {
            id: 1,
            name: '"Информационная безопасность"',
            date: "6.03.23г",
            value: '19/20' 
        },
        {
            id: 2,
            name: '"Информационная безопасность"',
            date: "6.03.23г",
            value: '19/20' 
        },
        {
            id: 3,
            name: '"Информационная безопасность"',
            date: "6.03.23г",
            value: '19/20' 
        }
    ] 
}


export const TestResultSlice = createSlice({
    initialState: initialState,
    name: 'testResult',
    reducers: {

    }
}) 