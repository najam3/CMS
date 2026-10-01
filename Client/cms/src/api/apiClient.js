import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

apiClient.interceptors.request.use((config) => {
    try {
        const session = JSON.parse(localStorage.getItem("signInSession") || "null");
        if (session?.token) {
            config.headers = config.headers || {};
            config.headers.Authorization = "Bearer " + session.token;
        }
    } catch {
        localStorage.removeItem("signInSession");
    }

    return config;
});

export default apiClient;
