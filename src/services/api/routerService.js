// src/services/api/routerService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const routerService = {
  // Get connected devices
  getConnectedDevices: async () => {
    try {
      const response = await api.get('/router/devices');
      return response.data;
    } catch (error) {
      console.error('Error fetching connected devices:', error);
      throw error;
    }
  },

  // Get bandwidth usage
  getBandwidthUsage: async () => {
    try {
      const response = await api.get('/router/bandwidth');
      return response.data;
    } catch (error) {
      console.error('Error fetching bandwidth usage:', error);
      throw error;
    }
  },

  // Get router status
  getRouterStatus: async () => {
    try {
      const response = await api.get('/router/status');
      return response.data;
    } catch (error) {
      console.error('Error fetching router status:', error);
      throw error;
    }
  },

  // Disconnect a device
  disconnectDevice: async (macAddress) => {
    try {
      const response = await api.post('/router/disconnect', { macAddress });
      return response.data;
    } catch (error) {
      console.error('Error disconnecting device:', error);
      throw error;
    }
  },

  // Set bandwidth limit for a device
  setBandwidthLimit: async (macAddress, downloadLimit, uploadLimit) => {
    try {
      const response = await api.post('/router/bandwidth/limit', {
        macAddress,
        downloadLimit,
        uploadLimit
      });
      return response.data;
    } catch (error) {
      console.error('Error setting bandwidth limit:', error);
      throw error;
    }
  }
};

export default routerService;