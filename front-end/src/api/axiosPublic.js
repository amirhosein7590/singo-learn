import axios from "axios";

/**
 *axios instactance for handle public requests
 */

const axiosPublic = axios.create({
    baseURL : 'https://singo-learn-server.onrender.com'
})

export default axiosPublic;