const { Schema, model } = require('mongoose');

const userProfileModel = new Schema({
    userId: {
        type: String,
        required: true,
    },
    balance: {
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