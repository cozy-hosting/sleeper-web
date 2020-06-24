import axios from "axios";

function getUrl()
{
  let depUrl = location.hostname;
  console.log(depUrl);
  if (depUrl.includes("web.cozy"))
  {
    depUrl=depUrl.replace("web", "sleeper");
    return depUrl;
  }
  return "https://localhost:5001";
}

// API Client for External MicroServices [Glancers, User]
const ExtApiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : getUrl(),
  headers: {
    "X-Forwarded-Authorization": "Bearer " + localStorage.getItem("authToken")
  }
});

export default ExtApiClient;
