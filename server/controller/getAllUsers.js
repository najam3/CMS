const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {

    try {
        const results = await userModel.getAllUsers();
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully.",
            users: results
        });
  
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = getAllUsers;