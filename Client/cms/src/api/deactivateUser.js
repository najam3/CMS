import apiClient from "./apiClient";

export default async function deactivateUser(id) {
    console.log("deactivateUser called with id:", id);
    const response = await apiClient.patch("/users/" + encodeURIComponent(id) + "/status");
    return response.data;
}
