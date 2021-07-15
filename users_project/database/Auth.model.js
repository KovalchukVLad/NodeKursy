const { Schema, model } = require('mongoose');

const { databaseTablesEnum } = require('../constants');

const AuthSchema = new Schema({
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: databaseTablesEnum.USER
    }
}, { timestamps: true });

AuthSchema.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(databaseTablesEnum.AUTH, AuthSchema);
