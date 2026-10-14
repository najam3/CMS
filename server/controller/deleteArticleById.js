const userModel = require("../models/userModel");


const deleteDraftedArticleById = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
        const response = await userModel.deleteDraftedArticleById(id);
        return res.status(200).json({
            message: 'Article was removed',
            status: 'success',
            removedDraft: response
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
};

module.exports = deleteDraftedArticleById;
