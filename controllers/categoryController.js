const multer = require('multer');
const multerS3 = require('multer-s3');
const Category = require('../models/category');
const s3 = require('../config/aws');

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + '-' + file.originalname);
        }
    })
});

exports.uploadCategoryImage = upload.single('imageUrl');

// Create a new category
exports.createCategory = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }
  
    try {
      const { name, description} = req.body;
      const imageUrl = req.file.location;
  
      const product = new Category({
          name,
          description,
          image: imageUrl
      });
  
      await product.save();
      res.status(201).json(product);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
  
  };

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const category = await Category.findById(id);

  if (category) {
    category.name = name || category.name;
    category.description = description || category.description;

    if (req.file) {
      const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `category/${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      s3.upload(params, async (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'Error uploading image' });
        }

        category.image = data.Location;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
      });
    } else {
      const updatedCategory = await category.save();
      res.json(updatedCategory);
    }
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (category) {
    await category.remove();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
};
