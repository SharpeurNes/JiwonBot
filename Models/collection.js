const { Schema, model } = require('mongoose');

const collectionModel = new Schema({
    userId: {
        type: String,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    charId: {
        type: Number,
        required: true,
    },
    uniqueId: {
        type: String,
        required: true,
    },
    rarity: {
        type: Number,
        default: 0,
    },
    border: {
        type: String,
        default: null,
    },
});

module.exports = model('collection', collectionModel);