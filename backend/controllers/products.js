const productService = require('../services/products');
const jwt = require('jsonwebtoken');
const { getUserIdFromToken } = require('../utils/authUtils');

exports.createProduct = async (req, res) => {
  const { product_name, product_category, product_quantity, createdBy } = req.body;
  const token = req.headers.authorization; // Get token from request headers
  const userId = getUserIdFromToken(token); // Extract userId from token

  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token is missing or invalid' });
  }
  
  const result = await productService.createProduct({
    product_name,
    product_category,
    product_quantity,
    createdBy,
  });
  return res.status(result.success ? 201 : 500).json(result);
};

exports.getAllProducts = async (req, res) => {
  const token = req.headers.authorization; // Get token from request headers
  const userId = getUserIdFromToken(token); // Extract userId from token
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token is missing or invalid' });
  }
  
  const result = await productService.getAllProducts();
  return res.status(result.success ? 200 : 500).json(result);
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ success: false, message: 'Product ID is required' });
  }

  const token = req.headers.authorization; // Get token from request headers
  const userId = getUserIdFromToken(token); // Extract userId from token
  if (!userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token is missing or invalid' });
  }

  const result = await productService.deleteProduct(productId);
  return res.status(result.success ? 200 : 500).json(result);
};

