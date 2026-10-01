const userModel = require("../models/userModel");



const getAllArticles = async (req, res) => {
    try {
        const results = await userModel.getAllArticles();
        return res.status(200).json({
            success: true,
            message: "Articles retrieved successfully.",
            articles: results
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};


module.exports = getAllArticles;