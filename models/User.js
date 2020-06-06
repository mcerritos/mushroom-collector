const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 13,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
    },
    highScore: Number,
    basket : [Mushroom.schema],
    log : [Mushroom.schema],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;