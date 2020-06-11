import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_SLEEPER_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("authToken")
  }
});

export default apiClient;
