import axios from "axios";
import { API_URL } from '@/config/constants';

// const baseDomain = "https://localhost:1337";
const baseURL = `${API_URL}`; // Incase of /api/v1;

const apiClient = axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
    'Content-Type': 'application/json',
  }
});

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message || error.message;

    console.error(message);

    return Promise.reject(error);
  }
);

export default apiClient;