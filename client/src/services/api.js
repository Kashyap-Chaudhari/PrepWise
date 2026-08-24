import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://prep-wise-backend.onrender.com/api',
  headers: {

    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor: attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pp_token');
    if (token && !token.startsWith('demo-token-') && !token.startsWith('local-token-')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401 (unauthorized) gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = localStorage.getItem('pp_token');
    const isLocalOrDemo = token?.startsWith('demo-token-') || token?.startsWith('local-token-');

    // Only redirect if a genuine server auth verification failed (not demo or background data fetch)
    if (error.response?.status === 401 && !isLocalOrDemo) {
      if (error.config?.url?.includes('/auth/profile')) {
        localStorage.removeItem('pp_token');
        localStorage.removeItem('pp_user');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
