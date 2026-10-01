const userModel = require('../models/userModel');

const updateDraft = async (req, res) => {
    console.log(req.body)
    const { content, id } = req.body;
     console.log('content', content, id)
    try {
        const updated_draft = await userModel.updateDraft(content, id);
        return res.status(200).json({
            message: 'Updated Draft Successfully.',
            success: true,
            updated_draft
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = updateDraft;