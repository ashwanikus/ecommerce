const Order = require('../models/order');
const Product = require('../models/product');

exports.placeOrder = async (req, res) => {
    try {
        const { items } = req.body;
        const userId = req.user.id;
        const orderItems = [];
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) return res.status(404).send({ message: 'Product not found' });
            if (product.quantity < item.quantity) return res.status(400).send({ message: 'Insufficient stock' });
            product.quantity -= item.quantity;
            await product.save();
            orderItems.push({ product: product._id, quantity: item.quantity });
        }
        const order = new Order({ user: userId, items: orderItems });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(500).send(error);
    }
};
