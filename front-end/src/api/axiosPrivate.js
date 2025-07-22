import axios from "axios";

const axiosPrivate = axios.create({
  baseURL: "http://localhost:8080",
});

axiosPrivate.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("userInfos"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    console.log(error)

    if (error.response?.status == 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.log(originalRequest)

      try {
        const userInfos = JSON.parse(localStorage.getItem("userInfos")) || {};
        const res = await axios.post("http://localhost:8080/refresh-token" , {userId : userInfos.userId ,  role : userInfos.role});

        const newAccessToken = res.data.token;

        userInfos.token = newAccessToken;
        localStorage.setItem("userInfos", JSON.stringify({...userInfos , token : newAccessToken}));

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosPrivate;
