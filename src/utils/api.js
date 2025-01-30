import axios from 'axios';

export const authApi = axios.create({
  baseURL: 'https://authentication-89y4.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const recipeApi = axios.create({
  baseURL: 'https://recipeapi-6qtp.onrender.com',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the auth token
recipeApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
