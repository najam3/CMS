const userModel = require("../models/userModel");



const getAllArticles = async (req, res) => {
    const {id} = req.params;
    console.log(id)
    try {
           
            const results = await userModel.getAllArticles(id);
            console.log('resuls', results)
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