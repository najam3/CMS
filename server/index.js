const path = require("path");






require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
// const createUser = require("./controller/createUser");
const editUser = require("./controller/editUser");
const deleteUser = require("./controller/deleteUser");
const getAllUsers = require("./controller/getAllUsers");
const { default: getUsers } = require("./controller/getUsers");
const getAllArticles = require("./controller/getAllArticles");
const getUserRoleCount = require("./controller/getUserRoleCount");
const login = require("./controller/login");
const createArticle = require("./controller/createArticle");
const updateDraft = require("./controller/updateDraft");
const deleteArticle = require("./controller/deleteArticle");
const searchUser = require("./controller/searchUser");
const deactivateUser = require("./controller/deactivateUser");
const requireAdmin = require("./middleware/requireAdmin");
const createUser = require("./controller/createUser");
const getArticleByArticleId = require("./controller/getArticleByArticleId");
const deleteDraftedArticleById = require("./controller/deleteArticleById");




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
// api.use(requireAdmin);

// Change the resource paths to a noun  
api.patch("/users/:id/status", deactivateUser);
api.get("/users/roleCount", getUserRoleCount);
api.delete("/users/:id", deleteUser);
api.put("/users/:id", editUser);
api.post("/users", createUser);     
api.get("/users", getAllUsers);
api.get("/users/count", getUsers);
api.get("/searchUsers", searchUser);

// Article routes
app.delete("/articles/:id/article", deleteDraftedArticleById)
app.get("/articles/:id/article", getArticleByArticleId)
api.patch("/articles/:id", updateDraft);
api.get("/articles/:id", getAllArticles);
api.post("/articles", createArticle);
api.delete("/articles/:id", deleteArticle);
// api.put("/publishDraft", publishDraft);

// Keep the existing local API URLs working and expose the same router under /api for Netlify.
app.use(api);
app.use("/api", api);

if (require.main === module) {
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server listening on port " + (process.env.PORT || 3000));
    });
}

module.exports = app;
