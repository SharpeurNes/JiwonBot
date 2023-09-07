const { Schema, model } = require('mongoose');

const userProfileModel = new Schema({
    userId: {
        type: String,
        required: true,
    },
    gold: {
        type: Number,
        default: 100,
    },
    ticket: {
        type: Number,
        default: 2,
    },
    dust: {
        type: Number,
        default: 0,
    },
    gem: {
        type: Number,
        default: 0,
    },
    lastDaily: {
        type: Date,
        delfault: null,
    },
    preference: {
        type: String,
        default: "AK"
    },
});

module.exports = model('userProfile', userProfileModel);