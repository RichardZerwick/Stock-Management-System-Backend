const { Product } = require('../sequelizeSetup');

class ProductService {
  async createProduct({ product_name, product_category, product_quantity, createdBy }) {
    try {
      const product = await Product.create({
        product_name,
        product_category,
        product_quantity,
        createdBy,
      });

      return {
        success: true,
        message: 'Product created successfully',
        product: {
          id: product.id,
          product_name: product.product_name,
          product_category: product.product_category,
          product_quantity: product.product_quantity,
          createdBy: product.createdBy,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        },
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error' };
    }
  }

  async getAllProducts() {
    try {
      const products = await Product.findAll();

      return {
        success: true,
        message: 'Products retrieved successfully',
        products: products.map((product) => ({
          id: product.id,
          product_name: product.product_name,
          product_category: product.product_category,
          product_quantity: product.product_quantity,
          createdBy: product.createdBy,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        })),
      };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error' };
    }
  }

  async deleteProduct(productId) {
    try {
      const product = await Product.findByPk(productId);

      if (!product) {
        return { success: false, message: 'Product not found' };
      }

      await product.destroy();

      return { success: true, message: 'Product deleted successfully' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Server error' };
    }
  }
}

module.exports = new ProductService();
