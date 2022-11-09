const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: [2, "The name should be minimum 2 characters long!"]

    },
    img: {
        type: String,
        required: true,
        validate: {
            validator: /^http?/,
            message: 'Image url should be a link'
        },
    },
    price: {
        type: Number,
        required: true
    },
    cryptoDescription: {
        type: String,
        required: true,
        minlength: [10, "Description must be minimum 10 characters long!"]
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal']
    },
    buyCrypto: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner:
    {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }

})


const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;

