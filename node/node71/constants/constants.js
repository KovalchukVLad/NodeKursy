module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_CONNECTION_URL || 'mongodb://localhost:27017/node71',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Access_Secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'Refresh_Secret',
};
