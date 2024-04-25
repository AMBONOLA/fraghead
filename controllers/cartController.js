const { addItemToCart, createCart, getAll, getById } = require('../models/cart.model');

exports.renderCartPage = (req, res) => {
	res.render('cart');
};

exports.addItemToCart = async (req, res) => {
	const { productId } = req.params;
	const { cartId } = req.session;

	try {
		await addItemToCart(cartId, productId, 1);
		res.status(200).send('Item added to cart successfully');
	} catch (error) {
		console.error('Error adding item to cart:', error);
		res.status(500).send('Internal Server Error');
	}
};
