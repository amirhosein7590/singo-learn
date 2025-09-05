import axios from "axios";
/**
 * Axios instance for authenticated API requests with token management
 * Handles automatic token attachment and refresh token logic
 * and handel private request (request that need access token)
 */

const axiosPrivate = axios.create({
  baseURL: "https://singo-learn-server.onrender.com",
});


axiosPrivate.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("userInfos"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // add access token in request header before send it to server
      return config;
    }
    return Promise.reject({login : false}) // no token avalable so (user not logined)
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (res) => res, // pass successfull response
  async (error) => {
        // Check if error is 403 (Forbidden) and request hasn't been retried
    const originalReq = error.config;
    if (error.response?.status == 403 && !originalReq._retry) { // check (original_retry) for avoid inifinity loop
    try {
        originalReq._retry = true; // set _retry for first time
        const userInfos = JSON.parse(localStorage.getItem("userInfos"));
        const response = await axios.post(
          "https://singo-learn-server.onrender.com/refresh-token",
          {
            userId: userInfos.userId,
            role: userInfos.role,
          }
        );
        const newAccessToken = response.data.token; // extract new access token from response
        originalReq.headers["Authorization"] = `Bearer ${newAccessToken}`; // replace new token to original request config for repeat original request
        localStorage.setItem( //replace new access token to old
          "userInfos",
          JSON.stringify({ ...userInfos, token: newAccessToken })
        );
        return axiosPrivate(originalReq); // return original request with new information (access token)
      } catch (refreshError) {
        return Promise.reject(refreshError); // refresh token is not avalable
      }
    }
    return Promise.reject(error) // handle unexpected errors
  }
);

export default axiosPrivate;
