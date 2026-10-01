const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const login = async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }

        const normalizedEmail = email.trim().toLowerCase();
        if (!EMAIL_PATTERN.test(normalizedEmail)) {
            return res.status(400).json({ success: false, message: "Enter a valid email address." });
        }

        const user = await userModel.findUserByEmail(normalizedEmail);
        if (!user || !user.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ success: false, message: "Email or password is incorrect." });
        }

        if (String(user.role || "").toLowerCase() !== "admin"
            || String(user.status || "").toLowerCase() !== "active") {
            return res.status(403).json({ success: false, message: "Only active administrator accounts can access this portal." });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not configured.");
        }

        const token = jwt.sign(
            { sub: String(user.id), role: "admin" },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Signed in successfully.",
            user: { id: user.id, token, email: user.email, role: user.role, name: user.name },
        });
    } catch (error) {
        console.error("Login failed:", error);
        return res.status(500).json({ success: false, message: "Unable to sign in right now." });
    }
};

module.exports = login;
