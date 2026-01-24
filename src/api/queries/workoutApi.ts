import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios/axiosBaseQuery";
import { ApiResponse, CreateWorkoutTemplateDTO, WorkoutTemplate } from "src/types";

export const workoutApi = createApi({
  reducerPath: 'workout2',
  baseQuery: axiosBaseQuery(), 
  tagTypes: ['WORKOUT_TEMPLATES'],
  endpoints: (builder) => ({
    createWorkoutTemplate: builder.mutation<ApiResponse<WorkoutTemplate[]>, CreateWorkoutTemplateDTO>({
      query: (createTemplateDTO) => ({
        url: '/workout/templates/create',
        method: 'POST', 
        data: createTemplateDTO
      }), 
      invalidatesTags: [{ type: 'WORKOUT_TEMPLATES', id: 'LIST' }]
    }), 
    getUserWorkoutTemplates: builder.query<ApiResponse<WorkoutTemplate[]>, void>({
      query: () => ({
        url: '/workout/templates', 
        method: 'GET'
      }), 
      providesTags: (result) => 
        result?.data 
        ? 
        [
          { type: 'WORKOUT_TEMPLATES', id: 'LIST' }, 
          ...result.data?.map(({ id }) => ({ type: 'WORKOUT_TEMPLATES' as const, id }) )
        ]
        :
        [{ type: 'WORKOUT_TEMPLATES', id: 'LIST' }]
      
    })
  })
})

export const {
  useCreateWorkoutTemplateMutation, 
  useGetUserWorkoutTemplatesQuery
} = workoutApi; 