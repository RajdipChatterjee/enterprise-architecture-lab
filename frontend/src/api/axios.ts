import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7163/api",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: false,
  timeout: 60000
});

export default api;