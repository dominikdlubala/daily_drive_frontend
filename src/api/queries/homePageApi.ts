import { createApi } from '@reduxjs/toolkit/query/react'; 
import { axiosBaseQuery } from '../axios/axiosBaseQuery';
import { HomePageData } from 'src/types';

export const homePageApi = createApi({
  reducerPath: 'homePage', 
  baseQuery: axiosBaseQuery(), 
  endpoints: (builder) => ({
    getHomePageData: builder.query<HomePageData, void>({
      query: () => ({ url: '/user/home', method: 'GET' }),
    }), 
  })
})

export const {
  useGetHomePageDataQuery
} = homePageApi; 