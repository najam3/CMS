import apiClient from "./apiClient";

export async function loginUser(credentials) {
    return apiClient.post("/login", credentials);
}
