const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createProduct, uploadProductImage, getProduct ,getProductByCategoryId} = require('../controllers/productController');
const router = express.Router();

router.post('/', protect, uploadProductImage, createProduct);

router.get('/', protect, getProduct);

router.get('/:categoryId', protect, getProductByCategoryId);

module.exports = router;