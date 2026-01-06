import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axios/axiosBaseQuery";
import { ApiResponse, CreateExerciseDefinitionDTO, ExerciseDefinition } from "src/types";

export const exerciseApi = createApi({
  reducerPath: 'exercise', 
  baseQuery: axiosBaseQuery(), 
  endpoints: (builder) => ({
    createExerciseDefinition: builder.mutation<ApiResponse<ExerciseDefinition>, CreateExerciseDefinitionDTO>({
      query: (createExDefDTO) => ({ 
        url: '/exercise/create', 
        method: 'POST',
        data: createExDefDTO
      }), 

    }) 
  })
})

export const { 
  useCreateExerciseDefinitionMutation
} = exerciseApi; 