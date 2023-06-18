import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { baseApiUrl } from 'shared/lib/ApiConfig/ApiConfig'


export const testResultApi =  createApi({
    reducerPath: 'testResultApi',
    tagTypes: ['Results'],
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseApiUrl}/v1/`,
        headers: {
            'Content-Type': 'application/json'
        },
    prepareHeaders: (headers, { getState }) => {
        const token = getState().user.access_token
        headers.set('Authorization', `Bearer ${token}`)
        return headers
    }
    }),
    endpoints: (build) => ({
        sendResults: build.mutation({
            query: (data) => ({
                url: 'results/',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['Results']
        }), 
        getResults: build.query({
            query: (params) => ({
                url: 'results/',
                method: 'GET',
                params: params
            }),
            providesTags: ['Results']

        }),
        sendStageResults: build.mutation({
            query: (data) => ({
                url: 'stages/result/',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            invalidatesTags: ['Stages']
        }), 
        
    }),
})