import axios from "axios";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api_producao:8000/"
    : "http://localhost:8000/api/";

export default function api() {
  const api_token = localStorage.getItem("api_token");
  let axiosInstance = axios.create({
    baseURL: API_URL,
    //Use abaixo a instancia do Token
    headers: {
      authorization: api_token ? `Token ${api_token}` : "",
    },
  });

  return axiosInstance;
}
