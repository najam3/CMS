const userModel = require('../models/userModel');

const createArticle = async (req, res) => {
    const { status, content, author_id } = req.body;
        console.log(status)
    try {
        const created_article = await userModel.createArticle(status, content, author_id);
        return res.status(200).json({
            success: true,
            message: `Article ${status}`,
            created_article
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




module.exports = createArticle 