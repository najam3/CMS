import apiClient from "./apiClient"

const getAricleByArticleId = async (id) => {
    const response = await apiClient.get(`/articles/${id}/article`);
    return response;
}

export default getAricleByArticleId;