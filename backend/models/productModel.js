const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Add user field
});

module.exports = mongoose.model('Product', productSchema);
