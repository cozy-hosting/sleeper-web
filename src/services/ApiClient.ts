import Axios from "axios";

export const apiClient = Axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("authToken")
  }
});
