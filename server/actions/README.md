# Fresh demo database

1. Create a new, empty PostgreSQL database for the deployment.
2. In the Supabase SQL editor, run `001_schema.sql` to create the `users` and `articles` tables.
3. Put the new database connection string in `server/.env` as `DATABASE_URL`, and set `DB_SSL=true` for Supabase.
4. From the repository root, run `node server/actions/seedDemo.js` once. The script creates an active admin using the recruiter credentials shown on the login screen, three sample team members, and five sample articles. It stores bcrypt password hashes and does not copy records from the local database.

The seed script is safe to rerun: it leaves existing accounts unchanged and skips sample articles that are already present. You can set `DEMO_ADMIN_EMAIL` and `DEMO_ADMIN_PASSWORD` in the environment before running it to choose different demo sign-in credentials.
