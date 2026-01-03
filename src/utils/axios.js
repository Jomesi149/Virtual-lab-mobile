import axios from 'axios';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

// Backend API URL (Vercel)
const API_BASE_URL = 'https://virtual-lab-api.vercel.app';

// Encryption key (dalam produksi, gunakan key yang lebih aman)
const ENCRYPTION_KEY = 'ux-lab-secure-key-2024';

// Enkripsi sederhana untuk web (Base64 + XOR)
const encrypt = (text) => {
  if (!text) return text;
  try {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      );
    }
    // Use encodeURIComponent for special characters before btoa
    return btoa(unescape(encodeURIComponent(result)));
  } catch (e) {
    console.error('Encrypt error:', e);
    return text;
  }
};

const decrypt = (encoded) => {
  if (!encoded) return encoded;
  try {
    // Decode and handle special characters
    const text = decodeURIComponent(escape(atob(encoded)));
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length)
      );
    }
    return result;
  } catch (e) {
    console.error('Decrypt error:', e);
    // Return the encoded value as-is if decryption fails (might be unencrypted old data)
    return encoded;
  }
};

// Storage helper untuk cross-platform (web & mobile)
// Web: localStorage dengan enkripsi (mirip SecureStore)
// Mobile: SecureStore (native encryption)
export const storage = {
  async getItem(key) {
    try {
      if (Platform.OS === 'web') {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) return null;
        return decrypt(encrypted);
      }
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('Storage getItem error:', e);
      return null;
    }
  },
  async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        const encrypted = encrypt(value);
        localStorage.setItem(key, encrypted);
        console.log(`Storage: saved ${key}`);
        return;
      }
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.error('Storage setItem error:', e);
    }
  },
  async removeItem(key) {
    try {
      if (Platform.OS === 'web') {
        localStorage.removeItem(key);
        return;
      }
      await SecureStore.deleteItemAsync(key);
    } catch (e) {
      console.error('Storage removeItem error:', e);
    }
  }
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await storage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        await storage.removeItem('token');
        await storage.removeItem('user');
      } catch (e) {
        console.error('Error clearing auth:', e);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
