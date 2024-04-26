const { renderCartPage, addItemToCart, getAllCarts} = require('../controllers/cartController');
const router = require("express").Router();

router.get('/cart', renderCartPage);
router.post('/add-to-cart/:productId', addItemToCart);
router.get('/carts', getAllCarts);

module.exports = { router };