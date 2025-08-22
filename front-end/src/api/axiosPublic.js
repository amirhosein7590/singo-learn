import axios from "axios";

/**
 *axios instactance for handle public requests
 */

const axiosPublic = axios.create({
    baseURL : 'http://localhost:8080'
})

export default axiosPublic;