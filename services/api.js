import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.4:5001/api', // Change ça selon ton URL
  timeout: 600000,
});

export default api;