import axios from 'axios';

const apiWBMasterClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WATERBODY_MASTER,
});

apiWBMasterClient.interceptors.request.use(async (config) => {
    let token = sessionStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(error));
});

export default apiWBMasterClient;
