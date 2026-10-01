const userModel = require("../models/userModel");

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body || {};

        const user = await userModel.deleteUser(id);

            return res.status(200).json({
            success: true,
            message: "User deleted successfully.",
            user
        }); 
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = deleteUser;