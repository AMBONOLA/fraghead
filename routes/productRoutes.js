const { productPage, productDetail } = require('../controllers/productController');
const router = require("express").Router();

router.get('/product-list', productPage);
router.get('/product-details/:product_id', productDetail);

module.exports = { router };