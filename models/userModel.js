const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    username: {
        type: String,
        // required: [true, 'Username is mandatory']
    },
    email: {
        type: String,
        required: [true, 'Email is mandatory'],
        unique: [true, 'Email is already taken'],
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('User', contactSchema);