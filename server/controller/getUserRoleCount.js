const userModel = require("../models/userModel");


const getUserRoleCount = async (req, res) => {

    try {
        const results = await userModel.getUserRoleCount();
        return res.status(200).json({
            success: true,
            message: "Role Count retrieved successfully.",
            role_count: results
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

module.exports = getUserRoleCount;