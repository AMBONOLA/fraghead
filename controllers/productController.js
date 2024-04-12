const { ProductModel, getAll, getById } = require('../models/product.model');

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

exports.productDetail = async (req, res) => {
	try {
		const productId = req.params.product_id;
		const productDetail = await getById(productId);
		console.log(productDetail);
		res.render('product-details', { productDetail: productDetail[0] });
	} catch (error) {
		console.error("Error fetching product details:", error);
		res.status(500).send("Internal Server Error");
	}
};