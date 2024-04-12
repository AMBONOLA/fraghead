const { getDBConnection } = require('./db-connection');

class ProductModel {
  constructor(product_id, name, description, price, image_url, category_id) {
    this.product_id = product_id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.image_Url = image_url;
    this.category_id = category_id;

  }
}

async function getById(productId) {
  return [
    { product_id: productId, name: "Product 1", description: "Description of Product 1", price: 10.99,
      image_url: "/images/placeholder-frag.jpg", category_id: 1 }
  ]
}


async function getAll() {
  console.log('is this cgetallcalled')
  return [
    { product_id: 1, name: "Product 1", description: "Description of Product 1", price: 10.99,
      image_url: "/images/placeholder-frag.jpg", category_id: 1 },
    { product_id: 2, name: "Product 2", description: "Description of Product 2", price: 19.99,
      image_url: "/images/placeholder-frag2.jpg", category_id: 2 },
    { product_id: 3, name: "Product 3", description: "Description of Product 3", price: 15.99,
      image_url: "/images/placeholder-frag.jpg", category_id: 1 },
    { product_id: 4, name: "Product 4", description: "Description of Product 4", price: 12.49,
      image_url: "/images/placeholder-frag2.jpg", category_id: 2 },
    { product_id: 5, name: "Product 5", description: "Description of Product 5", price: 8.99,
      image_url: "/images/placeholder-frag.jpg", category_id: 1 },
    { product_id: 6, name: "Product 6", description: "Description of Product 6", price: 14.99,
      image_url: "/images/placeholder-frag2.jpg", category_id: 2 },
    { product_id: 7, name: "Product 7", description: "Description of Product 7", price: 9.99,
      image_url: "/images/placeholder-frag.jpg", category_id: 1 },
    { product_id: 8, name: "Product 8", description: "Description of Product 8", price: 11.99,
      image_url: "/images/placeholder-frag2.jpg", category_id: 2 },
    { product_id: 9, name: "Product 9", description: "Description of Product 9", price: 16.99,
      image_url: "/images/placeholder-frag.jpg", category_id: 1 },
    { product_id: 10, name: "Product 10", description: "Description of Product 10", price: 22.99,
      image_url: "/images/placeholder-frag2.jpg", category_id: 2 }
  ];
}
module.exports = {ProductModel, getAll, getById};