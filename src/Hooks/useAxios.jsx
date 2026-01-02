import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

export const useAxios = () => {
  return axiosInstance;
};

// http://localhost:3000/

// https://asigement-server.vercel.app