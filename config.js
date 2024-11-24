require('dotenv').config();

module.exports = {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    JWT_TOKEN_EXPIRES_IN: 3600 * 1000 * 1, // 1 hours
};
