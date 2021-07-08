const { emailActionsEnum } = require('../constants');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },
    [emailActionsEnum.CREATE]: {
        templateName: 'create',
        subject: 'Account created'
    },
    [emailActionsEnum.DELETE]: {
        templateName: 'delete',
        subject: 'Account deleted'
    },
    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'Account updated'
    }
};
