const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.post('/create', productController.createProduct);
router.get('/retrieve', productController.getAllProducts);
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
