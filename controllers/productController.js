const { ProductModel, getAll } = require('../models/product.model');

exports.productPage = async (req, res) => {
	try {
		const allProducts = await getAll();
		console.log(allProducts);
		res.render('product-list', { allProducts });
	}catch (error){
		console.error("Error fetching products:", error);
		res.status(500).send("Internal Server Error");
	}
};