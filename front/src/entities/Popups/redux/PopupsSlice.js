import { createSlice } from "@reduxjs/toolkit"
import { ChoseRolePopup } from "../UI/ChoseRolePopup/ChoseRolePopup"
import { SigninPopup } from "../UI/SigninPopup/SigninPopup"
import { SignupPopup } from "../UI/SignupPopup/SignupPopup"
import { ChoseQuestionTypePopup } from "../UI/ChoseQuestionTypePopup/ChoseQuestionTypePopup"
import { AddClassPopup } from "../UI/AddClassPopup/AddClassPopup"
import { AddStudentPopup } from "../UI/AddStudentPopup/AddStudentPopup"
import { ChoseTestCategoryPopup } from "../UI/ChoseTestCategoryPopup/ChoseTestCategoryPopup"
import { ChoseQuestionPopup } from "../UI/ChoseQuestionPopup/ChoseQuestionPopup"
import { QuestionConstructorPopup } from "../UI/QuestionConstructorPopup/QuestionConstructorPopup"
import { NameCreationTestPopup } from "../UI/NameCreationTestPopup/NameCreationTestPopup"
import { ChoseActionForTestPopup } from "../UI/ChoseActionForTestPopup/ChoseActionForTestPopup"
import { MessagePopup } from "../UI/MessagePopup/MessagePopup"
import { OpenAccessPopup } from "../UI/OpenAccessPopup/OpenAccessPopup"
import { TestingStudentResultPopup } from "../UI/TestingStudentResultPopup/TestingStudentResultPopup"
import { TestingUserResultPopup } from "../UI/TestingUserResultPopup/TestingUserResultPopup/TestingUserResultPopup"


export const PopupNames = {
    CHOSE_ROLE: 'chose_role',
    SIGNIN: 'signin',
    SIGNUP: 'signup',
    CHOSE_QUESTION_TYPE: 'chose_question_type',
    ADD_CLASS: 'add_class',
    ADD_STUDENT: 'add_student',
    CHOSE_TEST_CATEGORY: 'chose_test_category',
    CHOSE_QUESTION: 'chose_question',
    QUESTION_CONSTRUCTOR: 'question_constructor',
    NAME_CREATION_TEST: 'name_creation_test',
    CHOSE_ACTION_FOR_TEST: 'chose_action_for_test',
    OPEN_ACCESS: 'open_access',
    MESSAGE_POPUP: 'message_popup',
    TESTING_STUDENT_RESULT: 'testing_student_result',
    TESTING_USER_RESULT: 'testing_user_result',
}


export const PopupBodies = {
    [PopupNames.CHOSE_ROLE]: ChoseRolePopup,
    [PopupNames.SIGNIN]: SigninPopup,
    [PopupNames.SIGNUP]: SignupPopup,
    [PopupNames.CHOSE_QUESTION_TYPE]: ChoseQuestionTypePopup,
    [PopupNames.ADD_CLASS]: AddClassPopup,
    [PopupNames.ADD_STUDENT]: AddStudentPopup,
    [PopupNames.CHOSE_TEST_CATEGORY]: ChoseTestCategoryPopup,
    [PopupNames.CHOSE_QUESTION]: ChoseQuestionPopup,
    [PopupNames.QUESTION_CONSTRUCTOR]: QuestionConstructorPopup,
    [PopupNames.NAME_CREATION_TEST]: NameCreationTestPopup,
    [PopupNames.CHOSE_ACTION_FOR_TEST]: ChoseActionForTestPopup,
    [PopupNames.MESSAGE_POPUP]: MessagePopup,
    [PopupNames.OPEN_ACCESS]: OpenAccessPopup,
    [PopupNames.TESTING_STUDENT_RESULT]: TestingStudentResultPopup,
    [PopupNames.TESTING_USER_RESULT]: TestingUserResultPopup,

}


const initialState = {
    activePopup: null,
    previousPopups: [],
    message: ''
}


export const PopupsSlice = createSlice({
    initialState: initialState,
    name: 'popups',
    reducers: {
        showPopup(state, action){
            if(state.activePopup){
                state.previousPopups.push(state.activePopup)
            }
            state.activePopup = action.payload
        },
        closePopup(state){
            state.activePopup = null
            state.previousPopups = []
        },
        showPreviousPopup(state){
            if(state.previousPopups.length > 0){
                const previousPopup = state.previousPopups.pop()
                state.activePopup = previousPopup
            }else {
                state.activePopup = null
                state.previousPopups = []
            }       
        },
        openMessage(state, action){
            state.message = action.payload
            if(state.activePopup){
                state.previousPopups.push(state.activePopup)
            }
            state.activePopup = PopupNames.MESSAGE_POPUP
            
        }   
    }
})

