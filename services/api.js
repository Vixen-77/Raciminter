import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.20.10.11:5001/api', // Change ça selon ton URL
  timeout: 600000,
});

export default api;