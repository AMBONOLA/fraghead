const { renderCartPage } = require('../controllers/cartController');
const router = require("express").Router();

router.get('/cart', renderCartPage);
router.post('/add-to-cart/${productId}',)

module.exports = { router };