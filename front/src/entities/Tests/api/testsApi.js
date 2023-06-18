import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { baseApiUrl } from 'shared/lib/ApiConfig/ApiConfig'
import { TestsSlice } from '../redux/TestsSlice'


export const testsApi =  createApi({
    reducerPath: 'testsApi',
    tagTypes: ['Tests', 'CustomTests', 'Stages'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseApiUrl}/v1/`,
        headers: {
            'Content-Type': 'application/json'
        },
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.access_token
            if(token){
                headers.set('Authorization', `Bearer ${token}`)
            } 
            return headers
        }
    }),
    endpoints: (build) => ({
        fetchTests: build.query({
            query: (params) => ({
                url: 'tests/',
                params: params
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try {
                    const { data } = await queryFulfilled
                    if (data){
                        dispatch(TestsSlice.actions.setTests(data))
                    }
                    
                }catch(error){}
            },
            providesTags: ['Tests', 'CustomTests'],
        }),
        fetchAllStages: build.query({
            query: () => ({
                url: 'stages/'
            }),
            providesTags: ['Stages'],
        }),
        fetchCompletedStages: build.query({
            query: () => ({
                url: 'stages/completed/'
            }),
            providesTags: ['Stages'],
        }),
    })
})