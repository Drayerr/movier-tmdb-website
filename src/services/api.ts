import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const baseURL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: apiKey,
    "Content-Type": "application/json",
  },
  params: {
    language: "en-US",
  },
});

export default api;
