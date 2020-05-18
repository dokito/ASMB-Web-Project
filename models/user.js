const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName:  {
        type: String,
        required: true
    },
    university:  {
        type: String,
        required: true
    },
    email:  {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        min: 0,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isStudent: {
        type: Boolean,
        default: false
    },
    isUser: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const user = mongoose.model('user', userSchema);

module.exports = user;