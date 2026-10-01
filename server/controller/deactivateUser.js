const userModel = require("../models/userModel");

const deactivateUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ success: false, message: "A user ID is required." });
    }

    try {
        const result = await userModel.deactivateUser(id);
        if (!result) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        return res.status(200).json({
            success: true,
            message: `User deactivated. ${result.deletedArticles} article(s) deleted.`,
            user: result.user,
            deletedArticles: result.deletedArticles,
        });
    } catch (error) {
        console.error("Error deactivating user:", error);
        return res.status(500).json({ success: false, message: "Unable to deactivate user." });
    }
};

module.exports = deactivateUser;

