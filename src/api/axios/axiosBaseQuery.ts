import { BaseQueryFn } from "@reduxjs/toolkit/query";
import client from "./client"
import { AxiosError } from "axios"

interface AxiosBaseQueryArgs {
  url: string;
  method: string;
  data?: any;
  params?: any;
}

export const axiosBaseQuery = ({ baseUrl = ''} = {}): BaseQueryFn<AxiosBaseQueryArgs> => 
  async ({ url, method, data, params }) => {
    try {
      const result = await client({
        url: baseUrl + url, 
        method, 
        data, 
        params
      })

      return result; 
    } catch(error) {
      const err = error as AxiosError; 

      return {
        error: err.response?.data || err.message 
    }
  }
}