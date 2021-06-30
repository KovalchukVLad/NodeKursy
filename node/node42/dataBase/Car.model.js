const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum } = require('../constants');

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
        max: 15
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 100
    }
}, { timestamps: true });

module.exports = model(dataBaseTablesEnum.Car, carSchema);
