import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000, // Timeout 5 detik
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
