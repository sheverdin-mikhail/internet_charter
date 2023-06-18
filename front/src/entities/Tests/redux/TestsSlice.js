import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    stage: {},
    tests: [
        // {
        //     id: 123124,
        //     img: Image,
        //     title: 'Антивирусы',
        //     tasks: [
        //         {
        //             id: 1,
        //             type: 'checkbox',
        //             question: 'Что НЕ относится к персональным данным ?',
        //             answers: [
        //                 {
        //                     text: 'Фамилия, имя, отчество',
        //                     isCorrect: false
        //                 },
        //                 {
        //                     text: 'Все наши документы',
        //                     isCorrect: false
        //                 },
        //                 {
        //                     text: 'Банковские данные',
        //                     isCorrect: false
        //                 },
        //                 {
        //                     text: 'Картинка природы из Интернета',
        //                     isCorrect: true
        //                 },
        //             ]
        //         },
        //         {
        //             id: 2,
        //             type: 'radio',
        //             question: 'Что НЕ относится к персональным данным ?',
        //             answers: [
        //                 {
        //                     text: 'Фамилия, имя, отчество',
        //                     isCorrect: false
        //                 },
        //                 {
        //                     text: 'Все наши документы',
        //                     isCorrect: false
        //                 },
        //                 {
        //                     text: 'Банковские данные',
        //                     isCorrect: false
        //                 },
        //                 {
        //                     text: 'Картинка природы из Интернета',
        //                     isCorrect: true
        //                 },
        //             ]
        //         },
        //     ]
        // },
       
    ]
}


export const TestsSlice = createSlice({
    name: 'tests',
    initialState: initialState,
    reducers: {
        setStage(state, action){
            state.stage = action.payload
        }
    }
})
