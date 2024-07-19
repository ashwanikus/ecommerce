const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { placeOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/', protect, placeOrder);

module.exports = router;