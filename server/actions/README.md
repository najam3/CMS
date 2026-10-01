# Fresh demo database

1. Create a new, empty PostgreSQL database. Supabase is the prepared option for this deployment.
2. In the Supabase SQL editor, run `001_schema.sql` to create the `users` and `articles` tables.
3. In Netlify site environment variables, set `DATABASE_URL` to the Supabase shared transaction pooler connection string (port 6543), `DB_SSL=true`, `DB_POOL_MAX=1`, and a long random `JWT_SECRET`. Keep these values out of Git. Netlify provides the site `URL` used for CORS.
4. To seed the demo data, put the database connection string in `server/.env` as `DATABASE_URL` with `DB_SSL=true`, then run `node server/actions/seedDemo.js` from the repository root. The script creates an active admin using the recruiter credentials shown on the login page, three sample team members, and five sample articles. It stores bcrypt password hashes and does not copy records from the local database.

The seed script is safe to rerun: it leaves existing accounts unchanged and skips sample articles that are already present. You can set `DEMO_ADMIN_EMAIL` and `DEMO_ADMIN_PASSWORD` in the environment before running it to choose different demo sign-in credentials.
