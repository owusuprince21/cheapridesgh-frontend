// import api from './api';
// import Cookies from 'js-cookie';
// import { AuthResponse, User } from '@/types/car';

// export const login = async (username: string, password: string): Promise<AuthResponse> => {
//   const response = await api.post('/auth/login/', { username, password });
//   const { access, refresh, user } = response.data;
  
//   Cookies.set('access_token', access);
//   Cookies.set('refresh_token', refresh);
//   Cookies.set('user', JSON.stringify(user));
  
//   return response.data;
// };

// export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
//   const response = await api.post('/auth/register/', { username, email, password });
//   const { access, refresh, user } = response.data;
  
//   Cookies.set('access_token', access);
//   Cookies.set('refresh_token', refresh);
//   Cookies.set('user', JSON.stringify(user));
  
//   return response.data;
// };

// export const logout = async (): Promise<void> => {
//   const refreshToken = Cookies.get('refresh_token');
//   if (refreshToken) {
//     try {
//       await api.post('/auth/logout/', { refresh: refreshToken });
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   }
  
//   Cookies.remove('access_token');
//   Cookies.remove('refresh_token');
//   Cookies.remove('user');
// };

// export const getCurrentUser = (): User | null => {
//   const userCookie = Cookies.get('user');
//   return userCookie ? JSON.parse(userCookie) : null;
// };

// export const isAuthenticated = (): boolean => {
//   return !!Cookies.get('access_token');
// };

import api from './api';
import Cookies from 'js-cookie';
import { AuthResponse, User } from '@/types/car';

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/login/', { username, password });
  const { access, refresh, user } = response.data;
  
  // Clear any existing tokens first
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
  
  // Set new tokens with proper options
  Cookies.set('access_token', access);
  Cookies.set('refresh_token', refresh);
  Cookies.set('user', JSON.stringify(user));
  
  // Also store in localStorage as backup
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('access_token', access);
  
  return response.data;
};

export const register = async (username: string, email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post('/auth/register/', { username, email, password });
  const { access, refresh, user } = response.data;
  
  // Clear any existing tokens first
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
  
  // Set new tokens with proper options
  Cookies.set('access_token', access);
  Cookies.set('refresh_token', refresh);
  Cookies.set('user', JSON.stringify(user));
  
  // Also store in localStorage as backup
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('access_token', access);
  
  return response.data;
};

export const logout = async (): Promise<void> => {
  const refreshToken = Cookies.get('refresh_token');
  if (refreshToken) {
    try {
      await api.post('/auth/logout/', { refresh: refreshToken });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  // Clear all authentication data from cookies
  Cookies.remove('access_token');
  Cookies.remove('refresh_token');
  Cookies.remove('user');
  
  // Clear all authentication data from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
  
  // Clear all authentication data from sessionStorage
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
  sessionStorage.removeItem('user');
  
  // Clear any other potential auth-related data
  localStorage.removeItem('isAuthenticated');
  sessionStorage.removeItem('isAuthenticated');
  
  // Force reload to clear any cached state
  window.location.reload();
};

export const getCurrentUser = (): User | null => {
  // Try cookies first, then localStorage as fallback
  let userCookie = Cookies.get('user');
  if (!userCookie) {
    userCookie = localStorage.getItem('user') ?? undefined;
  }
  
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing user data:', error);
      // Clear corrupted data
      Cookies.remove('user');
      localStorage.removeItem('user');
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  const token = Cookies.get('access_token') || localStorage.getItem('access_token');
  const user = getCurrentUser();
  return !!(token && user);
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();
  if (!user || !isAuthenticated()) {
    console.log('isAdmin: No user or not authenticated');
    return false;
  }
  
  // Check if user is admin (staff user)
  const adminStatus = user.username === 'admin' || user.is_staff === true || user.is_superuser === true;
  console.log('isAdmin check:', {
    username: user.username,
    is_staff: user.is_staff,
    is_superuser: user.is_superuser,
    result: adminStatus
  });
  return adminStatus;
};

export const getAuthToken = (): string | null => {
  return Cookies.get('access_token') || localStorage.getItem('access_token');
};