const { getDBConnection } = require('./db-connection');

class ProductModel {
  constructor(product_id, name, description, price, category_id) {
    this.product_id = product_id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.category_id = category_id;

  }

  static async getAll() {
    return [
      { product_id: 1, name: "Product 1", description: "Description of Product 1", price: 10.99, category_id: 1 },
      { product_id: 2, name: "Product 2", description: "Description of Product 2", price: 19.99, category_id: 2 }
    ];
  }

  static async getById(productId) {
    return [
      { product_id: productId, name: "Product 1", description: "Description of Product 1", price: 10.99, category_id: 1 }
    ]
  }
}

module.exports = ProductModel;