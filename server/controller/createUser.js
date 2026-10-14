const userModel = require("../models/userModel");
const bycrypt = require("bcrypt");


const createUser = async (req, res) => {
    try {
        const { name, email, role, status, password } = req.body || {};

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required."
            });
        }
         
        const hashedPassword = await bycrypt.hash(password, 10);
        const normalizedEmail = email.trim().toLowerCase();
       
        const user = await userModel.createUser(
            name.trim(),
            normalizedEmail,
            status,
            hashedPassword
        );
        console.log('role', role);
        const storedRole = await userModel.createRoleForUser(role, user.id);
        const userToReturn = {...user, storedRole};
        console.log('storedRole', userToReturn)
        

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            user:userToReturn
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Unable to create user."
        });
    }
};

module.exports = createUser;