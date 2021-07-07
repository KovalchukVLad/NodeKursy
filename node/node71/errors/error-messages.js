module.exports = {
    RECORD_NOT_FOUND: {
        message: 'RECORD NOT FOUND',
        code: '400.1'
    },

    FIELD_IS_EMPTY: {
        message: 'FIELD IS EMPTY',
        code: '400.2'
    },

    ValidationError: {
        message: 'Error in validation',
        code: '400.3'
    },

    WRONG_TOKEN: {
        message: 'WRONG TOKEN',
        code: '401.1'
    },

    WRONG_PATH: {
        message: 'WRONG PATH',
        code: '404.1'
    },

    WRONG_EMAIL: {
        message: 'THIS EMAIL ALREADY EXSISTS',
        code: '409.1'
    },

    WRONG_EMAIL_OR_PASSWORD: {
        message: 'WRONG EMAIL OR PASSWORD',
        code: '409.2'
    },

    CONFLICT_BETWEEN_TOKEN_AND_ID: {
        message: 'CONFLICT BETWEEN TOKEN AND ID',
        code: '409.3'
    },
};
