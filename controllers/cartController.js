const Cart = require('../models/cart');
const Product = require('../models/product');

exports.addToCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
    
        for (const element of cartItems) {
            const product = await Product.findById(element._id);
            if (product.inventory < element.quantity) {
                return res.status(400).send(`Not enough quantity of ${element.name} in the stock`);
            }
        }
    
        let cart = await Cart.findOneAndUpdate(
            { user: userId },
            { products: cartItems },
            { new: true, upsert: true }
        );
    
        await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
    
};



exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.id;
        let cart = await Cart.find();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).send(error);
    }
};