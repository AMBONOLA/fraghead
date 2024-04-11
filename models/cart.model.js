const { getDBConnection } = require('./db-connection');

class CartModel {
  constructor(cart_id, user_id, created_at) {
    this.cart_id = cart_id;
    this.user_id = user_id;
    this.created_at = created_at;
  }

  static async getAll() {
    return [
      { cart_id: 1, user_id: 1, created_at: "2024-04-10T12:00:00Z" },
      { cart_id: 2, user_id: 2, created_at: "2024-04-11T12:00:00Z" }
    ];
  }

  static async getById(cartId) {
    return { cart_id: cartId, user_id: 1, created_at: "2024-04-10T12:00:00Z" };
  }
}

module.exports = CartModel;

