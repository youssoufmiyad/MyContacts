import axios from "axios";
import Cookies from "js-cookie";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

console.log(import.meta.env.VITE_API_URL)

api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
