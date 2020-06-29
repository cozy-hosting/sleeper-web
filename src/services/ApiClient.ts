import axios from "axios";

function getUrl()
{
  let depUrl = location.hostname;
  if (depUrl.includes("web.cozy"))
  {
    depUrl=depUrl.replace("web", "sleeper");
    return "https://"+depUrl;
  }
  return "https://localhost:5001";
}

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL ?? getUrl(),
  headers: {
    Authorization: "Bearer " + localStorage.getItem("authToken")
  }
});

export default apiClient;
