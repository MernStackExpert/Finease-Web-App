import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
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

// http://localhost:3000/

// https://asigement-server.vercel.app