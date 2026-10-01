import apiClient from "./apiClient";

export async function getActiveUsers() {
    const response = await apiClient.get("/getUsers");
    return response.data;
}

export async function getAllArticles() {
    const response = await apiClient.get("/getAllArticles");
    return response.data;
}
