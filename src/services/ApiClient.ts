import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: 'Bearer ' + process.env.VUE_APP_API_JWT_TOKEN
  }
});

export default apiClient;
