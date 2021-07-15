module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE_URL: process.env.DATABASE_CONNECTION_URL || 'mongodb://localhost:27017',
    SYSTEM_EMAIL: process.env.SYSTEM_EMAIL,
    SYSTEM_EMAIL_PASSWORD: process.env.SYSTEM_EMAIL_PASSWORD,
    LOCALHOST_URL: 'http://localhost:3000'
};
