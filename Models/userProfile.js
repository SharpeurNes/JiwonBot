const { Schema, model } = require('mongoose');

const userProfileModel = new Schema({
    userId: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    }
});

module.exports = model('userProfile', userProfileModel);