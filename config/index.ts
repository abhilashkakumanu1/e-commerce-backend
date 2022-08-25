// Server
export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV || "development";

// Db credentials
export const DB_CREDENTIALS = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    db: process.env.DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
};

// JWT secrets
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_EXPIRY_IN_SECS = parseInt(process.env.JWT_EXPIRY_IN_SECS);
