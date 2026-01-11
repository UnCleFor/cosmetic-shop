import axios from "axios";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

// Thêm Token vào Header
axiosClient.interceptors.request.use(
  (config) => {
    const root = localStorage.getItem("persist:user");

    if (root) {
      const parsedRoot = JSON.parse(root);

      // accessToken bị stringify thêm lần nữa
      const accessToken = parsedRoot.accessToken
        ? JSON.parse(parsedRoot.accessToken)
        : null;

      if (accessToken) {
        config.headers.token = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error.response?.data || error)
);

export default axiosClient;
