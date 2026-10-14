const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const login = async (req, res) => {

    try {
        const { email, password, role } = req.body || {};
  
        if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const normalizedEmail = email.trim().toLowerCase();

        if (!EMAIL_PATTERN.test(normalizedEmail)) {
            return res.status(400).json({ success: false, message: "Enter a valid email address." });
        }

        const user = await userModel.findUserByEmail(normalizedEmail);
        console.log(user);
        const userRole = await userModel.getUserRole(user?.id);
        
        // Verify Password...
        if (!user || !user.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ success: false, message: "Email or password is incorrect." });
        }
         console.log(userRole, role)
        if(userRole?.name !== role ){
            return res.status(402).json({success:false, message: "Please Enter the role you were assigned by the administrator."})
        }

        if (String(user.status || "").toLowerCase() !== "active") {
            return res.status(403).json({ success: false, message: "Only active users can login to the portal" });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured.");
        }

        const token = jwt.sign(
            { sub: String(user.id), role: userRole?.name  },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Signed in successfully.",
            user: { id: user.id, token, email: user.email, role: userRole?.name , name: user.name },
        });

    } catch (error) {
        console.error("Login failed:", error);
        return res.status(500).json({ success: false, message: "Unable to sign in right now." });
    }
};

module.exports = login;
