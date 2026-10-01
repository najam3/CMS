const userModel = require("../models/userModel");

const publishDraft = async (req, res) => {
    const { content, id } = req.body || {};
    if (id == null || typeof content !== "string" || !content.trim()) {
        return res.status(400).json({ success: false, message: "A draft ID and article content are required." });
    }

    try {
        const publishedDraft = await userModel.publishDraft(content, id);
        if (!publishedDraft) {
            return res.status(404).json({ success: false, message: "Draft not found." });
        }
        return res.status(200).json({
            message: "Article was published successfully",
            published_draft: publishedDraft,
            success: true,
        });
    } catch (error) {
        console.error("Error publishing article:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = publishDraft;
