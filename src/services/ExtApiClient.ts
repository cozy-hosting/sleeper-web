import axios from "axios";

// API Client for External MicroServices [Glancers, User]
const ExtApiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "X-Forwarded-Authorization": "Bearer " + localStorage.getItem("authToken")
  }
});

export default ExtApiClient;
