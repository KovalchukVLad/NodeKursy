const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {
    constants: { SYSYEM_EMAIL, SYSYEM_EMAIL_PASSWORD },
    responceCodesEnum: { INVALID_DATA }
} = require('../constants');
const templateInfo = require('../email-templates');
const { ErrorHandler, errorMessages: { WRONG_EMAIL_TEMPLATE } } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: SYSYEM_EMAIL,
        pass: SYSYEM_EMAIL_PASSWORD
    }
});

const sendEmail = async (userEmail, action, context = {}) => {
    const { templateName, subject } = templateInfo[action];

    if (!templateName) {
        throw new ErrorHandler(INVALID_DATA, WRONG_EMAIL_TEMPLATE.message, WRONG_EMAIL_TEMPLATE.code);
    }

    const html = await templateParser.render(templateName, context);

    await transporter.sendMail({
        from: 'No Reply',
        to: userEmail,
        subject,
        html
    });
};

module.exports = {
    sendEmail
};
