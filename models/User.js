const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { saltRounds } = require('../constants');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required!'],
        unique: true,
        minlength: [5, "Username must be at least 5 characters long"]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


userSchema.pre('save', function (next) {

    bcrypt.hash(this.password, saltRounds)
        .then(hashedPass => {
            this.password = hashedPass;

            next();
        });

});

const User = mongoose.model('User', userSchema);

module.exports = User;

