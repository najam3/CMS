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
app.use(express.json());

const allowedOrigins = (process.env.CLIENT_ORIGINS || "http://localhost:3001")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error("Origin not allowed by CORS"));
    },
}));

app.post("/login", login);
app.use(requireAdmin);

app.post("/createUser", createUser);
app.post("/editUser", editUser);
app.post("/deleteUser", deleteUser);
app.post("/deactivateUser/:id", deactivateUser);
app.get("/getUsers", getUsers);
app.get("/getAllUsers", getAllUsers);
app.get("/getAllArticles", getAllArticles);
app.get("/getUserRoleCount", getUserRoleCount);
app.post("/createNewarticle", createArticle);
app.post("/updateDraft", updateDraft);
app.post("/publishDraft", publishDraft);
app.post("/deleteArticle/:id", deleteArticle);
app.get("/searchUsers", searchUser);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port " + (process.env.PORT || 3000));
});
