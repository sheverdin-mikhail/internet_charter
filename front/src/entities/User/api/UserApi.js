import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { baseApiUrl } from 'shared/lib/ApiConfig/ApiConfig'
import { UserSlice } from '../redux/UserSlice'


export const userApi =  createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${baseApiUrl}/`,
        headers: {
            'Content-Type': 'application/json'
        },
    }),
    endpoints: (build) => ({
        createToken: build.mutation({
            query: (data) => ({
                url: 'auth/jwt/create/',
                method: 'POST',
                body: JSON.stringify(data)
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try {
                    const { data } = await queryFulfilled
                    if(data.access){
                        const user_response = await dispatch(userApi.endpoints.fetchUserDetail.initiate(data.access))
                        dispatch(UserSlice.actions.setUser(user_response.data))
                    }
                }catch(error){}
            }
        }),
        refreshToken: build.mutation({
            query: (data) => ({
                url: 'auth/jwt/refresh/',
                method: 'POST',
                body: JSON.stringify(data)
            })
        }),
        registerUser: build.mutation({
            query: (data) => ({
                url: 'v1/user/create/',
                method: 'POST',
                body: JSON.stringify(data)
            })
        }),
        fetchUserDetail: build.mutation({
            query: (token) => ({
                url: 'v1/user/',
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }),
        }),
        saveUser: build.mutation({
            query: (data) => ({
                url: 'v1/user/',
                method: 'PATCH',
                body: JSON.stringify(data.formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${data.token}`
                }
            })
        }),
        saveAvatar: build.mutation({
            query: (data) => ({
                url: 'v1/user/',
                method: 'PATCH',
                body: data.formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${data.token}`
                }
            })
        }),
    }),

})

