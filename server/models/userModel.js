const pool = require("../config/db");

const createUser = async (name, email, status, password) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, status, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, email, status, password]
    )
    return result.rows[0];
}

const editUser = async (id, name, email, role, status) => {
    const result = await pool.query(
        "UPDATE users SET  name = $2, email = $3, role = $4, status = $5 WHERE id = $1 RETURNING *",
        [id, name, email, role, status]
    )
    return result.rows[0];
}

const deactivateUser = async (id) => {
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const userResult = await client.query(
            `UPDATE users
             SET status = 'inactive'
             WHERE id = $1
             RETURNING id, name, email, role, status`,
            [id]
        );

        if (!userResult.rows.length) {
            await client.query("ROLLBACK");
            return null;
        }

        const deletedArticles = await client.query(
            `DELETE FROM articles AS article
             USING users AS author
             WHERE author.id = $1
               AND article.author_id = author.id
             RETURNING article.id`,
            [id]
        );

        await client.query("COMMIT");
        return {
            user: userResult.rows[0],
            deletedArticles: deletedArticles.rowCount,
        };
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

const deleteUser = async (id) => {
    const result = await pool.query(
        "DELETE FROM users WHERE id = $1 RETURNING *",
        [id]
    )
    return result.rows[0];
}

const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );
    return result.rows[0];
};

const getUsers = async (req, res) => {
    const result = await pool.query('SELECT COUNT(*) FROM users');
    return result.rows[0].count;
};


const getAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}


const searchUsers = async (searchTerm) => {
    const term = typeof searchTerm === "string" ? searchTerm.trim() : "";
    const results = await pool.query(
        `SELECT id, name, email, role, status
         FROM users
         WHERE name ILIKE $1 OR email ILIKE $1 OR role ILIKE $1 OR status ILIKE $1
         ORDER BY id ASC`,
        [`%${term}%`]
    );
    return results.rows;
};


const deleteDraftedArticleById = async (id) => {
const results = await pool.query(
        `
        DELETE FROM articles
            WHERE id = $1
        RETURNING*`, [id]
    );
    return results.rows[0];
}


const getAllArticles = async (id) => {
    if (Number(id)) {
        const result = await pool.query(
            `SELECT articles.*, users.name
             FROM articles
             JOIN users ON users.id = articles.author_id
             WHERE articles.author_id = $1`,
            [id]
        );
        return result.rows;
    } else {
        console.log('not going here...')
        const result = await pool.query(
            `SELECT articles.*, users.name
             FROM articles
             JOIN users ON users.id = articles.author_id`
        );

        return result.rows;
    }
};


const getUserRoleCount = async () => {
    const result = await pool.query(`
    SELECT
        COUNT(*) FILTER (WHERE role = 'admin') AS admin_count,
        COUNT(*) FILTER (WHERE role = 'editor') AS editor_count,
        COUNT(*) FILTER (WHERE role = 'author') AS author_count
    FROM users
`);
    return result.rows[0];
}


const createArticle = async (status, content, author_id) => {

    const results = await pool.query(
        `INSERT INTO articles(status, content, author_id)
         VALUES($1, $2, $3) RETURNING*`,
        [status, content, author_id]
    )
    return results.rows[0];
}


const updateDraft = async (content, id) => {
    const results = await pool.query(
        `UPDATE articles
         SET content = $1
         WHERE id = $2
         RETURNING *`,
        [content, id]
    );
    return results.rows[0];
};



const publishDraft = async (content, id) => {
    const results = await pool.query(
        `UPDATE articles
         SET content = $1,
             status = 'published'
         WHERE id = $2
         RETURNING *`,
        [content, id]
    );

    return results.rows[0];
};

const getArticleByArticleId = async (id) => {
    console.log('id', id)
    const results = await pool.query(
        `
         SELECT * FROM articles WHERE id = ${id}
        `,
    );

    return results.rows[0];
}

const deleteArticle = async (id) => {
    const results = await pool.query(
        `DELETE FROM articles
            WHERE id = $1
            RETURNING *`,
        [id]
    );

    return results.rows[0];
};

const searchArticles = async (searchTerm) => {
    const results = await pool.query(
        `SELECT * FROM articles
         WHERE content ILIKE $1`,
        [`%${searchTerm}%`]
    );

    return results.rows;
};

const getUserRole = async (id) => {
    const results = await pool.query(`SELECT roles.name
         FROM roles
         JOIN users ON users.id = roles.user_role
         WHERE users.id = $1`, [id])
    return results.rows[0];
}

const createRoleForUser = async (role, id) => {
    const results = await pool.query(
        `INSERT INTO roles (name, user_role)
     VALUES ($1, $2)
     RETURNING *`,
        [role, id]
    );

    return results.rows[0];
}



module.exports = {
    createUser,
    getArticleByArticleId,
    getUserRole,
    createRoleForUser,
    editUser,
    deleteUser,
    deactivateUser,
    getUsers,
    getAllUsers,
    searchUsers,
    getAllArticles,
    getUserRoleCount,
    findUserByEmail,
    searchArticles,
    deleteArticle,
    createArticle,
    updateDraft,
    publishDraft,
    deleteDraftedArticleById
};








