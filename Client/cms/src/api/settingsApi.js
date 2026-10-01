import apiClient from "./apiClient";

export async function getAllUsers() {
    const response = await apiClient.get("/getAllUsers");
    return response.data;
}

export async function createUsers(data) {
    try {
        const response = await apiClient.post("/createUser", data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export async function geUserRoleCount() {
    const response = await apiClient.get("/getUserRoleCount");
    return response.data;
}
