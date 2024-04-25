function handleAddToCartButtonClick() {
	document.querySelectorAll('.add-to-cart-btn').forEach(button => {
		button.addEventListener('click', function(event) {
			event.preventDefault();
			const productId = this.dataset.productid;
			console.log(productId)
			console.log(`Product added to cart: ${productId}`);
		});
	});
}

document.addEventListener('DOMContentLoaded', function() {
	handleAddToCartButtonClick();
});

