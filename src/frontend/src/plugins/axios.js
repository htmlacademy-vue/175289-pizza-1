import axios from "axios";

const API_URL = "/api";
const API_DEFAULT_ERROR_MESSAGE =
  "Возникла ошибка при выполнении запроса к серверу";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    axiosInstance.$notifier.error(
      err?.response?.data?.error?.message || API_DEFAULT_ERROR_MESSAGE
    );
    return Promise.reject(err);
  }
);

export default axiosInstance;
