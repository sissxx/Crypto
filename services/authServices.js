const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { secret, options } = require('../constants');

exports.create = (userData) => User.create(userData);

exports.login = async (email, password) => {

    const user = await User.findOne({ email });

    if (!user) {

        throw new Error('User does not exist');
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {

        throw new Error('Incorrect email or password');
    };

    return user;
};

exports.createToken = (user) => {
    const payload = { _id: user._id, email: user.email, address: user.address };

    const promiseResult = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });
    return promiseResult;
}