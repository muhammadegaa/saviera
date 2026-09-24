import axios from "axios";

const api = axios.create({ baseURL: "" });

export function setToken(token) {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("saviera-dashboard-token", token);
  } else {
    delete api.defaults.headers.common.Authorization;
    localStorage.removeItem("saviera-dashboard-token");
  }
}

export function restoreToken() {
  const token = localStorage.getItem("saviera-dashboard-token");
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  return token;
}

export default api;
