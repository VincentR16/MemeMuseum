import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axios.post(
          "http://localhost:3000/auth/refresh",
          {},
          {
            withCredentials: true,
          }
        );
        console.log("AccessToken has been refreshed!");
        return api(originalRequest);
      } catch (err) {
        console.error("Refresh token failed:", err);
        localStorage.setItem("isAuthenticated", "false");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
