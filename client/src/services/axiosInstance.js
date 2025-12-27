// /client/src/services/axiosInstance.js

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Base URL for backend API

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ✅ Request interceptor to attach the JWT token
axiosInstance.interceptors.request.use(
    (config) => {
        // Token is stored as a plain string in localStorage
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
