import axios from 'axios';
const apiUrl = window.ENV.API_URL;

const api = axios.create({
    baseURL: apiUrl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    });

export default api;