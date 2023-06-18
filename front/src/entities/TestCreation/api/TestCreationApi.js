import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { baseApiUrl } from 'shared/lib/ApiConfig/ApiConfig'


export const testCreationApi =  createApi({
    reducerPath: 'testCreationApi',
    tagTypes: ['CustomTests'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseApiUrl}/v1/`,
        headers: {
            'Content-Type': 'application/json'
        },
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.access_token
        headers.set('Authorization', `Bearer ${token}`)
        return headers
    },
    }),
    endpoints: (build) => ({
        getQuestion: build.mutation({
            query: (data) => ({
                url: 'task/',
                method: 'GET',
                params: data
            }),

        }),  
        getAllQuestions: build.query({
            query: (data) => ({
                url: 'tasks/',
                method: 'GET',
                params: data
            }),
        }),  
        saveCustomTasksFromApi: build.mutation({
            query: (data) => ({
                url: 'tasks/',
                method: 'PATCH',
                body: data
             }),
        }),  
        getAllStages: build.query({
            query: () => ({
                url: 'stages/',
                method: 'GET',
             }),
        }),  
        saveTest: build.mutation({
            query: (data) => ({
                url: 'tests/',
                method: 'POST',
                body: data
             }),
            invalidatesTags: ['CustomTests'],
        }),  
        saveEditTest: build.mutation({
            query: (data) => ({
                url: 'tests/',
                method: 'PATCH',
                body: data
             }),
            invalidatesTags: ['CustomTests'],
        }),
        deleteTest: build.mutation({
            query: (data) => ({
                url: 'tests/',
                method: 'DELETE',
                body: data
             }),
            invalidatesTags: ['CustomTests'],
        }),
        fetchClassesForActivatioin: build.query({
            query: (data) => ({
                url: 'test/open-access',
                method: 'GET',
                params: data
             }),
        }),
        setTestForClasses: build.mutation({
            query: (data) => ({
                url: 'test/open-access',
                method: 'PATCH',
                body: data
             }),
        }),
        
                
    }),
})
