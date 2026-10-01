const { Pool } = require("pg");

const ssl = process.env.DB_SSL === "true"
    ? { rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== "false" }
    : undefined;

const poolConfig = process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL }
    : {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT || 5432),
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    };

if (ssl) {
    poolConfig.ssl = ssl;
}

// Keep each Netlify Function instance's local pool small; the hosted database pooler handles concurrency.
const maxConnections = Number(process.env.DB_POOL_MAX || (process.env.NETLIFY === "true" ? 1 : 10));
const pool = new Pool({ ...poolConfig, max: maxConnections });

module.exports = pool;
