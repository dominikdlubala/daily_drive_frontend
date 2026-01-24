import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import axios from "axios";
import { getToken, setToken } from "src/utils/token/tokenStorage";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000', 
  timeout: 10000, 
  withCredentials: true
}); 

client.interceptors.request.use(
  (config) => {
    const token = getToken(); 
    if(token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config; 
  }, 
  (error) => Promise.reject(error)
)

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; 
    if(originalRequest.url.includes('/auth/refresh')){
      return Promise.reject(error); 
    }

    if(error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        console.log('REFRESH TRIED')
        const { data } = await client.post('/auth/refresh'); 
        const newToken = data.data.accessToken; 
        setToken(newToken); 

        client.defaults.headers.common['Authorization'] = `Bearer ${newToken}`; 
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`; 

        return client(originalRequest); 
      } catch(error) {
        console.log('REFRESH FAILED')
        // window.location.href = '/login'; 
        return Promise.reject(error); 
      }
    }
    return Promise.reject(error);
  }
);

export default client;