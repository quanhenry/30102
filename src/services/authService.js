// src/services/authService.js
import axiosClient from './axiosClient';
import { API_CONFIG } from '../config/api';

export const authService = {
  // Đăng ký người dùng mới - POST /auth/register
  register: async (userData) => {
    try {
      const response = await axiosClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Đăng nhập - POST /auth/login
  login: async (credentials) => {
    try {
      const response = await axiosClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Lấy thông tin profile - GET /users/profile
  getProfile: async () => {
    try {
      const response = await axiosClient.get(API_CONFIG.ENDPOINTS.USERS.PROFILE);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Cập nhật thông tin profile - PUT /users/{id}
  updateProfile: async (id, userData) => {
    try {
      const response = await axiosClient.put(API_CONFIG.ENDPOINTS.USERS.UPDATE(id), userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};