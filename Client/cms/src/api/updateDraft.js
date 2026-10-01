import apiClient from "./apiClient";

export default async function updateDraft(payload) {
    const response = await apiClient.post("/updateDraft", payload);
    return response.data;
}
