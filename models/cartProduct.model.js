const { getDBConnection } = require('./db-connection');

class CartProductModel {
  constructor(cart_prod_id, cart_id, product_id, quantity) {
    this.cart_prod_id = cart_prod_id;
    this.cart_id = cart_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }

  static async getAll() {
    return [
      { cart_prod_id: 1, cart_id: 1, product_id: 1, quantity: 2 },
      { cart_prod_id: 2, cart_id: 2, product_id: 2, quantity: 1 }
    ];
  }

  static async getById(cartProdId) {
    return { cart_prod_id: cartProdId, cart_id: 1, product_id: 1, quantity: 2 };
  }
}

module.exports = CartProductModel;
