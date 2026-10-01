import apiClient from "./apiClient";

export default async function deleteArticle(id) {
    const response = await apiClient.post("/deleteArticle/" + encodeURIComponent(id));
    return response.data;
}
