import apiClient from "./apiClient";

const createNewArticle = async (payload) => {
    const response = await apiClient.post("/articles", payload);
    return response.data;
};

export default createNewArticle;
