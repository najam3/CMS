import apiClient from "./apiClient";

export default async function searchUsers(query) {
    const response = await apiClient.get("/searchUsers", {
        params: { searchTerm: query },
    });
    return response.data;
}
