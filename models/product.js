const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    imageURL: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
