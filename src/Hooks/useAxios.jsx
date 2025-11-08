import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://asigement-server.vercel.app",
});

export const useAxios = () => {
  return axiosInstance;
};
