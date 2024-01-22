const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.post('/create', productController.createProduct);
router.get('/retrieve', productController.getAllProducts);

module.exports = router;
