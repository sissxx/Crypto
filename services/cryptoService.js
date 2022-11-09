const Crypto = require('../models/Crypto');

exports.getAll = () => Crypto.find();
exports.create = (publicData) => Crypto.create(publicData);
exports.getOne = (cryptoId) => Crypto.findById(cryptoId);
exports.getOneDetails = (cryptoId) => Crypto.findById(cryptoId).populate('owner');
exports.updateOne = (cryptoId, publicData) => Crypto.updateOne({ _id: cryptoId }, { $set: publicData }, { runValidators: true });
exports.delete = (cryptoId) => Crypto.deleteOne({ _id: cryptoId });


