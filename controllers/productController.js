const multer = require('multer');
const multerS3 = require('multer-s3');
const Product = require('../models/product');
const s3 = require('../config/aws');
const dotenv = require('dotenv');

dotenv.config();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

exports.uploadProductImage = upload.single('imageUrl');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category , quantity} = req.body;
        const imageURL = req.file.location;

        const product = new Product({
            name,
            description,
            price: parseInt(price),
            category, 
            imageURL,
            quantity
        });

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getProduct = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products by category' });
    }
};

exports.getProductByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await Product.find({ category: categoryId });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products by category' });
    }
};
