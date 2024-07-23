const Order = require('../models/order');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.placeOrder = async (req, res) => {
    try {
        const {userId, items } = req.body;
        const orderItems = [];
        let totalPrice = 0;

        for (const item of items) {
            const product = await Product.findById(item._id);
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            const requestedQuantity = parseInt(item.quantity, 10);
            const productQuantity = parseInt(product.quantity, 10);
            const productPrice = parseInt(product.price, 10);

            if (isNaN(requestedQuantity) || isNaN(productQuantity) || isNaN(productPrice)) {
                return res.status(400).send({ message: 'Invalid quantity or price value' });
            }

            if (productQuantity < requestedQuantity) {
                return res.status(400).send({ message: 'Insufficient stock' });
            }

            product.quantity = productQuantity - requestedQuantity;
            totalPrice += productPrice * requestedQuantity;

            await product.save();
            orderItems.push({ product: product._id, quantity: requestedQuantity });
        }

        const order = new Order({
            user: userId,
            products: orderItems,
            totalAmount: totalPrice
        });
        await order.save();
        await Cart.deleteMany({ user: userId });
        res.status(201).send(order);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};
