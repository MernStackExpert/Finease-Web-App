import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://asigement-server.vercel.app",
});

export const useAxios = () => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
