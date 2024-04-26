const { addItemToCart, createCart, getAll, getCartItems } = require('../models/cart.model');
const {getProductById} = require("../models/product.model");


//utility func
function calculateTotalPrice(cartItems) {
	let totalPrice = 0;

	cartItems.forEach(item => {
		totalPrice += item.product.price * item.quantity;
	});

	return totalPrice.toFixed(2);
}


exports.renderCartPage = async (req, res) => {
	const { cartId } = req.session;
	console.log(req.session);

	try {
		let cartItems = [];
		let totalPrice = 0;
		if (cartId) {
			cartItems = await getCartItems(cartId);
			const productIds = cartItems.map(item => item.product_id);
			const productsPromises = productIds.map(productId => getProductById(productId));
			const products = await Promise.all(productsPromises);
			cartItems = cartItems.map((item, index) => ({
				...item,
				product: products[index]
			}));
			totalPrice = calculateTotalPrice(cartItems);
		}
		console.log(cartItems)
		res.render('cart', { cartItems, totalPrice });
	} catch (error) {
		console.error('Error fetching cart items:', error);
		res.status(500).send('Internal Server Error');
	}
};


exports.addItemToCart = async (req, res) => {

	const { productId } = req.params;
	const { cartId } = req.session;

	console.log("product ID:")
	console.log(productId)

	try {
		if (!cartId) {
			const newCartId = await createCart();
			req.session.cartId = newCartId;
		}
		console.log(req.session)
		const itemAdded = await addItemToCart(req.session.cartId, productId, 1);
		if (itemAdded) {
			res.status(200).send('Item added to cart successfully');
		} else {
			res.status(500).send('Failed to add item to cart');
		}
	} catch (error) {
		console.error('Error adding item to cart:', error);
		res.status(500).send('Internal Server Error');
	}
};

exports.getAllCarts = async (req, res) => {
	try {
		const carts = await getAll();
		res.status(200).json(carts);
	} catch (error) {
		console.error('Error fetching all carts:', error);
		res.status(500).send('Internal Server Error');
	}
};
