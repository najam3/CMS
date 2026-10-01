import userModel from "../models/userModel.js";


async function getUsers(req, res) {
    try {
        const results = await userModel.getUsers();
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully.",
            users: results
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export default getUsers;