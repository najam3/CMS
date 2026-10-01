const path = require("path");
const { randomBytes } = require("crypto");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const bcrypt = require("bcrypt");
const pool = require("../config/db");

const demoUsers = [
    { name: "Morgan Lee", email: "morgan.lee@example.com", role: "editor" },
    { name: "Jordan Patel", email: "jordan.patel@example.com", role: "author" },
    { name: "Casey Rivera", email: "casey.rivera@example.com", role: "author" },
];

const demoArticles = [
    {
        email: "abc1@gmail.com",
        status: "published",
        content: "Welcome to Bloggy. This sample article introduces the editorial workspace and shows how published stories appear to readers.",
    },
    {
        email: "morgan.lee@example.com",
        status: "published",
        content: "A thoughtful review process gives every story room to improve. Editors can help authors clarify the main idea, strengthen the structure, and prepare a polished final draft.",
    },
    {
        email: "jordan.patel@example.com",
        status: "published",
        content: "Small writing habits make a lasting difference. Keep a notebook of questions, collect useful details, and return to promising ideas when you have time to explore them.",
    },
    {
        email: "casey.rivera@example.com",
        status: "draft",
        content: "A field guide to better interviews. Start with open questions, listen for the detail behind each answer, and leave space for a follow-up you did not plan.",
    },
    {
        email: "jordan.patel@example.com",
        status: "draft",
        content: "Finding a story in everyday routines. This draft explores how ordinary places can reveal the history and character of a community.",
    },
];

async function seedDemoData() {
    if (!process.env.DATABASE_URL) {
        throw new Error("Set DATABASE_URL in server/.env to the fresh hosted database before seeding.");
    }

    const adminEmail = (process.env.DEMO_ADMIN_EMAIL || "abc1@gmail.com").trim().toLowerCase();
    const adminPassword = process.env.DEMO_ADMIN_PASSWORD || "1123456789";
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const adminHash = await bcrypt.hash(adminPassword, 10);
        await client.query(
            `INSERT INTO users (name, email, role, status, password_hash)
             VALUES ($1, $2, 'admin', 'active', $3)
             ON CONFLICT (email) DO NOTHING`,
            ["Bloggy Demo Admin", adminEmail, adminHash]
        );

        for (const user of demoUsers) {
            const passwordHash = await bcrypt.hash(randomBytes(32).toString("hex"), 10);
            await client.query(
                `INSERT INTO users (name, email, role, status, password_hash)
                 VALUES ($1, $2, $3, 'active', $4)
                 ON CONFLICT (email) DO NOTHING`,
                [user.name, user.email, user.role, passwordHash]
            );
        }

        for (const article of demoArticles) {
            await client.query(
                `INSERT INTO articles (status, content, author_id)
                 SELECT $1, $2, users.id
                 FROM users
                 WHERE users.email = $3
                   AND NOT EXISTS (
                       SELECT 1 FROM articles existing
                       WHERE existing.author_id = users.id AND existing.content = $2
                   )`,
                [article.status, article.content, article.email]
            );
        }

        await client.query("COMMIT");
        console.log(`Demo data is ready. Sign in with ${adminEmail} and the recruiter demo password shown on the login page.`);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
}

seedDemoData()
    .catch((error) => {
        console.error("Could not seed demo data:", error.message);
        process.exitCode = 1;
    })
    .finally(() => pool.end());
