module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_CONNECTION_URL || 'mongodb://localhost:27017/node91',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Access_Secret',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'Refresh_Secret',
    SYSYEM_EMAIL: process.env.SYSYEM_EMAIL || 'mail@gmail.com',
    SYSYEM_EMAIL_PASSWORD: process.env.SYSYEM_EMAIL_PASSWORD || '0000'
};
