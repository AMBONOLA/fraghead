const { getAll, getProductById, addProduct, addMultipleProducts } = require('../models/product.model');

exports.productPage = async (req, res) => {
	try {
		const allProducts = await getAll();
		// console.log(allProducts);
		res.render('product-list', { allProducts });
	} catch (error) {
		console.error("Error fetching products:", error);
		res.status(500).send("Internal Server Error");
	}
};

exports.productDetail = async (req, res) => {
	try {
		const productId = req.params.product_id;
		const productDetail = await getProductById(productId);
		res.render('product-details', { productDetail: productDetail[0] });
	} catch (error) {
		console.error("Error fetching product details:", error);
		res.status(500).send("Internal Server Error");
	}
};

exports.newProduct = async (req, res) => {
	try {
		const { name, description, price, imageUrl, categoryId, mainAccords, bestFor } = req.body;
		const productId = await addProduct(name, description, price, imageUrl, categoryId, mainAccords, bestFor);

		res.status(200).json({ success: true, message: 'Product added successfully', productId });

	} catch (error) {
		console.error("Error adding new product:", error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

exports.addMultipleProducts = async (req, res) => {
	try {
		const products = req.body;
		await addMultipleProducts(products);
		res.status(200).json({ message: 'Multiple products added successfully' });
	} catch (error) {
		console.error("Error adding multiple products:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
