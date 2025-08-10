// import axios from 'axios';
// import Cookies from 'js-cookie';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add auth token to requests
// api.interceptors.request.use((config) => {
//   const token = Cookies.get('access_token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Handle token refresh
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       const refreshToken = Cookies.get('refresh_token');
//       if (refreshToken) {
//         try {
//           const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
//             refresh: refreshToken,
//           });
//           const { access } = response.data;
//           Cookies.set('access_token', access);
//           error.config.headers.Authorization = `Bearer ${access}`;
//           return api.request(error.config);
//         } catch {
//           Cookies.remove('access_token');
//           Cookies.remove('refresh_token');
//           window.location.href = '/auth/login';
//         }
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = Cookies.get('access_token') || localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const refreshToken = Cookies.get('refresh_token') || localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refreshToken,
          });
          const { access } = response.data;
          Cookies.set('access_token', access);
          localStorage.setItem('access_token', access);
          error.config.headers.Authorization = `Bearer ${access}`;
          return api.request(error.config);
        } catch {
          // Clear all auth data on refresh failure
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          Cookies.remove('user');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          sessionStorage.clear();
          
          // Only redirect if not already on login page
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login';
          }
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;