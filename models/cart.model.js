const { getDBConnection } = require('./db-connection');

class CartModel {
  constructor(cart_id, user_id, created_at) {
    this.cart_id = cart_id;
    this.user_id = user_id;
    this.created_at = created_at;
  }
  static async createCart() {
    const db = await getDBConnection();
    try {
      const currentTime = new Date().toISOString();
      const result = await db.run('INSERT INTO Carts (user_id, created_at) VALUES (?, ?)', [1, currentTime]);
      const cartId = result.lastID;

      return cartId;
    } catch (error) {
      console.error('Error creating cart:', error);
      throw error;
    } finally {
      await db.close();
    }
  };

  static async addItemToCart(cartId, productId, quantity) {
    const db = await getDBConnection();
    try {
      const existingCartItem = await db.get(
          'SELECT * FROM CartProducts WHERE cart_id = ? AND product_id = ?',
          [cartId, productId]
      );

      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + quantity;
        await db.run(
            'UPDATE CartProducts SET quantity = ? WHERE cart_id = ? AND product_id = ?',
            [updatedQuantity, cartId, productId]
        );
      } else {
        await db.run(
            'INSERT INTO CartProducts (cart_id, product_id, quantity) VALUES (?, ?, ?)',
            [cartId, productId, quantity]
        );
      }
      return true;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    } finally {
      await db.close();
    }
  }

  static async getAll() {
    const db = await getDBConnection();

    try {
      const carts = await db.all('SELECT * FROM Carts');
      return carts;
    } catch (error) {
      console.error('Error fetching carts:', error);
      throw error;
    } finally {
      await db.close();
    }
  }

  static async getCartItems(cartId) {
    const db = await getDBConnection();

    try {
      const cartItems = await db.all('SELECT * FROM CartProducts WHERE cart_id = ?', [cartId]);
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items:', error);
      throw error;
    } finally {
      await db.close();
    }
  }
}

module.exports = CartModel;

