const { Schema, model } = require('mongoose');

const characterDataModel = new Schema({
    charId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    serie: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    generated: {
        type: Number,
        default: 0,
    },
    burned: {
        type: Number,
        default: 0,
    },
    owned: {
        type: Number,
        default: 0,
    },
});

module.exports = model('characterData', characterDataModel);