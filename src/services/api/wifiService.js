// src/services/api/wifiService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const wifiService = {
  // Get all connected users
  getConnectedUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/wifi/users`);
      return response.data;
    } catch (error) {
      console.error('Error fetching connected users:', error);
      throw error;
    }
  },

  // Disconnect a user
  disconnectUser: async (macAddress) => {
    try {
      const response = await axios.post(`${API_URL}/wifi/disconnect`, { macAddress });
      return response.data;
    } catch (error) {
      console.error('Error disconnecting user:', error);
      throw error;
    }
  },

  // Update user time limit
  updateTimeLimit: async (macAddress, newLimit) => {
    try {
      const response = await axios.put(`${API_URL}/wifi/time-limit`, {
        macAddress,
        timeLimit: newLimit
      });
      return response.data;
    } catch (error) {
      console.error('Error updating time limit:', error);
      throw error;
    }
  }
};

// src/services/api/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    // Add token decoding logic here if needed
    return token ? { token } : null;
  }
};