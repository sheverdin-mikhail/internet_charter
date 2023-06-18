import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: '',
    secondName: '',
    role: '',
    email: '',
    access_token: '',
    refresh_token: '',
    isAuthenticate: false,
    completedStages: [],
    chosedTest: null,
    certificate: false
}



export const UserSlice = createSlice({
    initialState: initialState,
    name: 'user',
    reducers: {
        setRole(state, action){
            state.role = action.payload
        },
        login(state, action){
            state.access_token = action.payload.access_token
            state.refresh_token = action.payload.refresh_token
            state.isAuthenticate = true
        },
        refreshToken(state, action){
            state.access_token = action.payload.access
        },
        logout(state){
            state.firstName=''
            state.secondName=''
            state.role=''
            state.access_token=''
            state.refresh_token=''
            state.isAuthenticate=false
            state.email = ''
            state.completedStages=[]
        },
        setUser(state, action){
            state.firstName = action.payload.first_name
            state.secondName = action.payload.last_name
            state.role = action.payload.role
            state.email = action.payload.email
            state.certificate = action.payload.user?.certificate ?? false
            state.avatar = action.payload.avatar
        },
        getAccessToken(state){
            return state.access_token
        },
        setChosedTest(state, action){
            state.chosedTest = action.payload
        },
        setStages(state, action){
            state.completedStages = action.payload
        },
        setCertificate(state){
            state.certificate = true
        },
        setFio(state, action){
            state.firstName = action.payload.first_name
            state.secondName = action.payload.last_name
        },
    }
})