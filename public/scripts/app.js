function handleAddToCartButtonClick() {
	document.querySelectorAll('.add-to-cart-btn').forEach(button => {
		button.addEventListener('click', async function(event) {
			event.preventDefault();
			const productId = this.dataset.productid;

			try {
				const response = await fetch(`/add-to-cart/${productId}`, { method: 'POST' });
				if (response.ok) {
					console.log('Product added to cart successfully');
					this.textContent = 'Added to Cart';
					this.disabled = true;
				} else {
					console.error('Failed to add product to cart');
				}
			} catch (error) {
				console.error('Error adding product to cart:', error);
			}
		});
	});
}

function handleOtherAction() {
	// Define event handling logic for other actions
}

document.addEventListener('DOMContentLoaded', function() {
	handleAddToCartButtonClick();
	handleOtherAction();
});
