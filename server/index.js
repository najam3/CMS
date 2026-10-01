const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const createUser = require("./controller/createUser");
const editUser = require("./controller/editUser");
const deleteUser = require("./controller/deleteUser");
const getAllUsers = require("./controller/getAllUsers");
const { default: getUsers } = require("./controller/getUsers");
const getAllArticles = require("./controller/getAllArticles");
const getUserRoleCount = require("./controller/getUserRoleCount");
const login = require("./controller/login");
const createArticle = require("./controller/createArticle");
const updateDraft = require("./controller/updateDraft");
const publishDraft = require("./controller/publishDraft");
const deleteArticle = require("./controller/deleteArticle");
const searchUser = require("./controller/searchUser");
const deactivateUser = require("./controller/deactivateUser");
const requireAdmin = require("./middleware/requireAdmin");

const app = express();
const api = express.Router();
app.use(express.json());

const allowedOrigins = [
    ...(process.env.CLIENT_ORIGINS || "http://localhost:3001")
        .split(",")
        .map((origin) => origin.trim()),
    process.env.URL,
].filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Origin not allowed by CORS"));
    },
}));

api.post("/login", login);
api.use(requireAdmin);

api.post("/createUser", createUser);
api.post("/editUser", editUser);
api.post("/deleteUser", deleteUser);
api.post("/deactivateUser/:id", deactivateUser);
api.get("/getUsers", getUsers);
api.get("/getAllUsers", getAllUsers);
api.get("/getAllArticles", getAllArticles);
api.get("/getUserRoleCount", getUserRoleCount);
api.post("/createNewarticle", createArticle);
api.post("/updateDraft", updateDraft);
api.post("/publishDraft", publishDraft);
api.post("/deleteArticle/:id", deleteArticle);
api.get("/searchUsers", searchUser);

// Keep the existing local API URLs working and expose the same router under /api for Netlify.
app.use(api);
app.use("/api", api);

if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server listening on port " + (process.env.PORT || 3000));
    });
}

module.exports = app;
