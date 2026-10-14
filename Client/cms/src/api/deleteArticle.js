import apiClient from "./apiClient";

export default async function deleteArticle(id) {
    const response = await apiClient.delete("/articles/" + encodeURIComponent(id));
    return response.data;
}
