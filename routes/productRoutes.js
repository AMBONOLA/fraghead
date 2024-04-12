const { productPage } = require('../controllers/productController');
const router = require("express").Router();

router.get('/product-list', productPage);

module.exports = { router };