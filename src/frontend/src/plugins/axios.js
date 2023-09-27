import axios from "axios";

const API_URL = "/api";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;
