const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum, userRolesEnum } = require('../constants');

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
        default: 15
    },
    role: {
        type: String,
        enum: Object.values(userRolesEnum),
        default: userRolesEnum.USER
    }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('Name+Role').get(function() {
    return `${this.name} - ${this.role}`;
});

module.exports = model(dataBaseTablesEnum.USER, userSchema);
