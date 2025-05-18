import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Interceptor para adicionar token no header Authorization
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
