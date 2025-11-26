import axios from 'axios';
import { auth } from './firebase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://project-fpv-express-server.vercel.app/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Firebase token to requests
api.interceptors.request.use(async (config) => {
  try {
    if (auth) {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return config;
});

// Auth API (simplified - Firebase handles most auth)
export const authAPI = {
  // Sync user with backend (called after Firebase auth)
  sync: async () => {
    const response = await api.post('/auth/sync');
    return response.data;
  },

  // Get current user from backend
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Verify token
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

// Blog API
export const blogAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/blogs', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/blogs', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/blogs/${id}`, data);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },

  getMyPosts: async () => {
    const response = await api.get('/blogs/user/my-posts');
    return response.data;
  },

  like: async (id) => {
    const response = await api.post(`/blogs/${id}/like`);
    return response.data;
  },
};

// Stats API
export const statsAPI = {
  getStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

export default api;
