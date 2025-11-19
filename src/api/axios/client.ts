import axios from "axios";

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', 
  timeout: 10000, 
  withCredentials: true
}); 

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if(token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config; 
  }, 
  (error) => Promise.reject(error)
)

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default client;