// Ensure a deterministic admin token for tests regardless of the real
// environment secret, and avoid requiring a live DATABASE_URL just to
// import modules that check for it at load time.
process.env.ADMIN_API_TOKEN = "test-admin-token";
process.env.DATABASE_URL ??= "postgres://test:test@localhost:5432/test";
process.env.LOG_LEVEL ??= "silent";
