const mongoose = require('mongoose');

const cartProductSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number },
    quantity: { type: Number},
    imageURL: { type: String},
});

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    products: [cartProductSchema]
});

module.exports = mongoose.model('Cart', cartSchema);
