import axios from 'axios';

const apiWBDClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WATERBODY_DETAILS,
});

apiWBDClient.interceptors.request.use(async (config) => {
    let token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(error));
});

export default apiWBDClient;