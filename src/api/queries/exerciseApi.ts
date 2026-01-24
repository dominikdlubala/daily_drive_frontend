import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios/axiosBaseQuery";
import { ApiResponse, CreateExerciseDefinitionDTO, ExerciseDefinition } from "src/types";

export const exerciseApi = createApi({
  reducerPath: 'exercise', 
  baseQuery: axiosBaseQuery(), 
  tagTypes: ['EXERCISE'],
  endpoints: (builder) => ({
    getExerciseByName: builder.query<ApiResponse<ExerciseDefinition[]>, string>({
      query: (exerciseName) => ({
        url: `/exercise/${exerciseName}`, 
        method: 'GET'
      }), 
      providesTags: (result) => [{ type: 'EXERCISE', id: 'LIST' }],
    }),
    createExerciseDefinition: builder.mutation<ApiResponse<ExerciseDefinition>, CreateExerciseDefinitionDTO>({
      query: (createExDefDTO) => ({ 
        url: '/exercise', 
        method: 'POST',
        data: createExDefDTO, 
      }), 
      invalidatesTags: [{ type: 'EXERCISE', id: 'LIST' }]
    }), 

  })
})

export const { 
  useCreateExerciseDefinitionMutation, 
  useLazyGetExerciseByNameQuery
} = exerciseApi; 