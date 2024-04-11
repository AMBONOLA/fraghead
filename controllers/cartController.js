const { cartModel } = require('../models/cart.model');

exports.renderCartPage = (req, res) => {
	res.render('cart');
};