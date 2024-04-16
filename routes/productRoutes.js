const { productPage, productDetail, newProduct, addMultipleProducts } = require('../controllers/productController');
const router = require("express").Router();

router.get('/products', productPage);
router.get('/products/details/:product_id', productDetail);
router.post('/products/add', newProduct);
router.post('/products/addMultiple', addMultipleProducts);

module.exports = { router };