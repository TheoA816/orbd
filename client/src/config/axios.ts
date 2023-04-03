import axios from "axios";

const BASE_URL = "https://orbd-be.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const axiosCustom = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});