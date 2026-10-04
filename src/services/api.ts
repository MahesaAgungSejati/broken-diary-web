import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getImageUrl = (path: string | null): string => {
  if (!path) return '/placeholder.jpg';
  const baseUrl = import.meta.env.VITE_API_URL?.replace('/api', '');
  return `${baseUrl}/storage/${path}`;
};

export default api;