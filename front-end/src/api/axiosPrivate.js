import axios from "axios";
import { useNavigate } from "react-router";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080",
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("userInfos"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    useNavigate("/login");
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error.config;
    if (error.response?.status == 403 && !originalReq._retry) {
      try {
        originalReq._retry = true;
        const userInfos = JSON.parse(localStorage.getItem("userInfos"));
        const response = await axios.post(
          "http://localhost:8080/refresh-token",
          {
            userId: userInfos.userId,
            role: userInfos.role,
          }
        );
        const newAccessToken = response.data.token;
        originalReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
        localStorage.setItem(
          "userInfos",
          JSON.stringify({ ...userInfos, token: newAccessToken })
        );
        return axiosPrivate(originalReq);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error)
  }
);

export default axiosPrivate;
