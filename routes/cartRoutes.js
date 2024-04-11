const { renderCartPage } = require('../controllers/cartController');
const router = require("express").Router();

router.get('/cart', renderCartPage);

module.exports = { router };