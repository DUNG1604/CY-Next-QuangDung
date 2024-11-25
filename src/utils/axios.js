import axios from 'axios';
import {useUtils} from "@/utils/useUtils";

const axiosInstance = axios.create({
    baseURL: "http://152.42.240.131/api/v1",
    timeout: 15000,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        let token = await useUtils().getCookie("token");
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response?.status === 401) {
            console.error('Token hết hạn hoặc không hợp lệ.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
