import apiClient from "./apiClient";

export async function getActiveUsers() {
    const response = await apiClient.get("/users/count");
    return response.data;
}

export async function getAllArticles(id) {
    const response = await apiClient.get(`/articles/${id}`);
    return response.data;
}
