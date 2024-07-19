const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(201).send(cart);
    } catch (error) {
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