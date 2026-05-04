import axios from 'axios';


export function GET_BASE_URL(){
  return "http://localhost:3000";
}

const api = axios.create({
  baseURL: `${GET_BASE_URL()}/api`,
  withCredentials:true,
});

export default api;
