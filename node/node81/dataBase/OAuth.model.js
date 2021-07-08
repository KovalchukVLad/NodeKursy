const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants');

const oAuthSchema = new Schema({
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
        ref: dataBaseTablesEnum.USER
    }
}, { timestamps: true });

oAuthSchema.pre('findOne', function() {
    this.populate('user');
});

module.exports = model(dataBaseTablesEnum.O_AUTH, oAuthSchema);
