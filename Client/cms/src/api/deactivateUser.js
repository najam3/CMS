import apiClient from "./apiClient";

export default async function deactivateUser(id) {
    const response = await apiClient.post("/deactivateUser/" + encodeURIComponent(id));
    return response.data;
}
