module.exports = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Access_Secret',
    ACCESS_TOKEN_DURATION: '10m',
    ACCESS_TOKEN: 'accessToken',

    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'Refresh_Secret',
    REFRESH_TOKEN_DURATION: '30d',
    REFRESH_TOKEN: 'refreshToken',

    EMAIL_CONFIRM_TOKEN_SECRET: process.env.EMAIL_CONFIRM_TOKEN_SECRET || 'Email_Secret',
    EMAIL_TOKEN_DURATION: '10m',
    EMAIL_TOKEN: 'emailToken',

    PASSWORD_CHANGE_CONFIRM_TOKEN_SECRET: process.env.PASSWORD_CHANGE_CONFIRM_TOKEN_SECRET || 'Password_Secret',
    PASSWORD_CHANGE_TOKEN_DURATION: '10m',
    PASSWORD_CHANGE_TOKEN: 'passwordToken',

    AUTHORIZATION: 'Authorization',
    PASSWORD_TOKEN: 'password-token',
    ACCESS: 'access',
    EMAIL: 'email',
    PASSWORD: 'password',
    CONFIRM_REGISTRATION_LINK: 'http://localhost:3000/users/email-confirm?confirm='
};
