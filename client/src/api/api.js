import axios from 'axios';

// Get the API base URL from environment variables (assuming a Vite setup)
// Example: VITE_API_URL=http://localhost:5000/api
const API_URL = import.meta.env.VITE_API_URL;

// Create a custom Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token to every request (if available)
api.interceptors.request.use(
  (config) => {
    // Assuming you store the JWT token in localStorage or context
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

export default api;