import apiClient from "./apiClient"


const deleteDraftedArticleById = async (id) => {
   const response = await apiClient.delete(`/articles/${id}/article`);
   return response;
}

export default deleteDraftedArticleById;