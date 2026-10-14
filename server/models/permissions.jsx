


const table = [
    {
        path: '/api/articles', permission: "articles:read", role: ["author", "admin"]
    },
    {
        path: '/api/articles', permission: "articles:create", role: ["author", "admin"]
    },
    {
        path: '/api/articles/:id', permission: "articles:delete", role: ["author", "admin"]
    }
]