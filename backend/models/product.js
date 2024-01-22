module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_category: {
        type: DataTypes.ENUM('Food', 'Clothes', 'Medicine', 'Household'),
        allowNull: false,
      },
      product_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 100,
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    Product.associate = (models) => {
      // Define associations if any (e.g., createdBy foreign key)
      Product.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator',
      });
    };
  
    return Product;
  };
  