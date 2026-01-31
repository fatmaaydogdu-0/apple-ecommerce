require('dotenv').config();

const config = {
    db: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'appledb'
    },
    port: process.env.PORT || 3003,
    env: process.env.NODE_ENV || 'development'
};

module.exports = config;