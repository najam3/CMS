const userModel = require("../models/userModel");

const editUser = async (req, res) => {
    try {
        const { id, name, email, role, status } = req.body || {};

        const user = await userModel.editUser(
            id,
            name.trim(),
            email.trim(),
            role,
            status
        );

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            user
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = editUser;