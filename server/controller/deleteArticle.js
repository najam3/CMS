const userModel = require("../models/userModel");

const deleteArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedArticle = await userModel.deleteArticle(id);
        res.status(200).json({ message: "Article deleted successfully", article: deletedArticle });
    } catch (error) {
        console.error("Error deleting article:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = deleteArticle;