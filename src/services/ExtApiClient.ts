import axios from "axios";

// API Client for External MicroServices [Glancers, User]
const ExtApiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : "https://localhost:5001",
  headers: {
    "X-Forwarded-Authorization": "Bearer " + localStorage.getItem("authToken")
  }
});

export default ExtApiClient;
