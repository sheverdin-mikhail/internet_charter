import { createSlice } from '@reduxjs/toolkit'
import Image from 'shared/assets/img/small-test-img.png'

const initiatlState = {
    tests: [
        {
            id: 1,
            img: Image,
            name: 'Антивирусы',
            tasks: [
                {
                    id: 1,
                    type: 'checkbox',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'radio',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
            ]
        },
        {
            id: 2,
            img: Image,
            name: 'Антивирусы',
            tasks: [
                {
                    id: 1,
                    type: 'checkbox',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'radio',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
            ]
        },
        {
            id: 3,
            img: Image,
            name: 'Антивирусы',
            tasks: [
                {
                    id: 1,
                    type: 'checkbox',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'radio',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
            ]
        },
        {
            id: 4,
            img: Image,
            name: 'Антивирусы',
            tasks: [
                {
                    id: 1,
                    type: 'checkbox',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'radio',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
            ]
        },
        {
            id: 5,
            img: Image,
            name: 'Антивирусы',
            tasks: [
                {
                    id: 1,
                    type: 'checkbox',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
                {
                    id: 2,
                    type: 'radio',
                    question: 'Что НЕ относится к персональным данным ?',
                    answers: [
                        {
                            text: 'Фамилия, имя, отчество',
                            isCorrect: false
                        },
                        {
                            text: 'Все наши документы',
                            isCorrect: false
                        },
                        {
                            text: 'Банковские данные',
                            isCorrect: false
                        },
                        {
                            text: 'Картинка природы из Интернета',
                            isCorrect: true
                        },
                    ]
                },
            ]
        },
    ]
}


export const TeacherTestsSlice = createSlice({
    initialState: initiatlState,
        name: 'teacherTests',
        reducers: {
        
        }
})