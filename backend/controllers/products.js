const productService = require('../services/products');

exports.createProduct = async (req, res) => {
  const { product_name, product_category, product_quantity, createdBy } = req.body;
  const result = await productService.createProduct({
    product_name,
    product_category,
    product_quantity,
    createdBy,
  });
  return res.status(result.success ? 201 : 500).json(result);
};

exports.getAllProducts = async (req, res) => {
  const result = await productService.getAllProducts();
  return res.status(result.success ? 200 : 500).json(result);
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    return res.status(400).json({ success: false, message: 'Product ID is required' });
  }

  const result = await productService.deleteProduct(productId);
  return res.status(result.success ? 200 : 500).json(result);
};