const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createCategory, getCategories, uploadCategoryImage } = require('../controllers/categoryController');
const router = express.Router();

router.post('/',protect, uploadCategoryImage, createCategory);
router.get('/', protect, getCategories);


module.exports = router;
