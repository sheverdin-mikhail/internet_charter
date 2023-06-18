import { createSlice } from '@reduxjs/toolkit'

const initiatlState = {
    classes: [
        // {
        //     id: 1,
        //     name: '5A',
        //     students: [
        //         {
        //             id: 1,
        //             fio: 'Иванов Иван',
        //             login: 'qwerty',
        //             password: '12345'
        //         }
        //     ]
        // },
        // {
        //     id: 2,
        //     name: '5B',
        //     students: [
        //         {
        //             id: 1,
        //             fio: 'Иванов2 Иван2',
        //             login: 'qwerty',
        //             password: '12345'
        //         }
        //     ]
        // },
    ],
    editionalClass: '',
    editionalStudent: '',
}


export const ClassesSlice = createSlice({
    initialState: initiatlState,
        name: 'classes',
        reducers: {
           
            removeEditionalClass(state){
                state.editionalClass = ''
            },
            removeEditionalSudent(state){
                state.editionalStudent = ''
            },
            setEditionalClass(state, action){
                state.editionalClass = action.payload
            },
            removeStudent(state, action){
                const students = state.classes.find(item => action.payload.class === item.id).students
                const index = students.findIndex(student => action.payload.student === student.id)
                if(index !== -1){
                    students.splice(index, 1)
                }
            },
            setEditionalStudent(state, action){
                state.editionalStudent = action.payload
            },
            setClasses(state, action){
                state.classes = action.payload
            }
        }
})