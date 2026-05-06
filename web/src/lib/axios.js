import axios from 'axios';

const api = axios.create({
  baseURL: mport.meta.env.VITE_API_URL +  '/api',
  withCredentials:true,
});

export default api;
