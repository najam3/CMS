const userModel = require("../models/userModel");

const searchUser = async (req, res) => {
    const { searchTerm } = req.query;

    try {
        const users = await userModel.searchUsers(searchTerm);
        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error("Error searching users:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = searchUser;
