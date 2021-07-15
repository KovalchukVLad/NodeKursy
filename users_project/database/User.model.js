const { Schema, model } = require('mongoose');

const { databaseTablesEnum, userRoles } = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    age: {
        type: Number,
        default: 20
    },
    role: {
        type: String,
        enum: Object.values(userRoles),
        default: userRoles.USER
    },
    isActive: {
        type: Boolean,
        default: true
    },
    avatar: {
        type: String
    },
    gallery: {
        type: Array
    }
}, { timestamps: true });

module.exports = model(databaseTablesEnum.USER, userSchema);
