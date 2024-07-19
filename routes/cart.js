const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { addToCart, getCartByUserId } = require('../controllers/cartController');
const router = express.Router();

router.post('/', protect, addToCart);

router.get('/', protect, getCartByUserId);

module.exports = router;