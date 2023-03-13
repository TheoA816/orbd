import axios from "axios";

const BASE_URL = "http://localhost:3001";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const axiosCustom = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});