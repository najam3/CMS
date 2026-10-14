import apiClient from "./apiClient";

export default async function updateDraft(payload) {
    const response = await apiClient.patch(`/articles/${payload.id}`, payload);
    return response.data;
}
