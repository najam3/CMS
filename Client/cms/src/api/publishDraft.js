import apiClient from "./apiClient";

const publishDraft = async (payload) => {
    const response = await apiClient.post("/publishDraft", payload);
    return response.data;
};

export default publishDraft;
