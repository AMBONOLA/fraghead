const { addItemToCart, createCart, getAll, getById } = require('../models/cart.model');

exports.renderCartPage = (req, res) => {
	res.render('cart');
};

exports.addItemToCart = async (req, res) => {
	const { productId } = req.params;
	const { cartId } = req.session;

	console.log(req.params);
	console.log(cartId);

	try {
		if (!cartId) {
			const newCartId = await createCart();
			req.session.cartId = newCartId;
		}

		await addItemToCart(req.session.cartId, productId, 1);
		res.status(200).send('Item added to cart successfully');
	} catch (error) {
		console.error('Error adding item to cart:', error);
		res.status(500).send('Internal Server Error');
	}
};
