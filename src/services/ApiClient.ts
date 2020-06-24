import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : "https://localhost:5001",
  headers: {
    Authorization: "Bearer " + localStorage.getItem("authToken")
  }
});

export default apiClient;
