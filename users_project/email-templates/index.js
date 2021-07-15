const { emailActionsEnum } = require('../constants');

module.exports = {
    [emailActionsEnum.CREATE]: {
        templateName: 'create',
        subject: 'Account created'
    },
    [emailActionsEnum.DELETE]: {
        templateName: 'delete',
        subject: 'Account deleted'
    },
    [emailActionsEnum.EMAIL_CONFIRM]: {
        templateName: 'email-confirm',
        subject: 'Confirm your email to end registration'
    },
    [emailActionsEnum.PASSWORD_CHANGE]: {
        templateName: 'password-change',
        subject: 'Your password was changed'
    },
    [emailActionsEnum.PASSWORD_CONFIRM]: {
        templateName: 'password-confirm',
        subject: 'Confirm your person to change password'
    },
    [emailActionsEnum.RESTORE]: {
        templateName: 'restore',
        subject: 'Account restored'
    },
    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'Account updated'
    },
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    }
};
