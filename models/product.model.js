const { getDBConnection } = require('./db-connection');

async function getById(productId) {
  return [
    {
      product_id: productId, name: "Product 2", description: "Description of Product 1", price: 10.99,
      image_url: "/images/placeholder-frag.jpg", category_id: 1, main_accords: 'woody, fresh, floral',
      best_for: 'spring, summer '
    }
  ]
}


async function getAll() {
  const db = await getDBConnection();

  try {
    const products = await db.all('SELECT * FROM Products');
    const parsedProducts = products.map(product => ({
      ...product,
      main_accords: JSON.parse(product.main_accords),
      best_for: JSON.parse(product.best_for)
    }));

    console.log(parsedProducts)
    return parsedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  } finally {
    await db.close();
  }
}


async function addProduct(name, description, price, imageUrl, categoryId, mainAccords, bestFor) {
  const db = await getDBConnection();

  try {

    const mainAccordsJSON = JSON.stringify(mainAccords);
    const bestForJSON = JSON.stringify(bestFor);

    console.log("mainAccords after stringify:", mainAccordsJSON);
    console.log("bestFor after stringify:", bestForJSON);

    const result = await db.run(
      `INSERT INTO products (name, description, price, image_url, category_id, main_accords, best_for) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, price, imageUrl, categoryId, mainAccordsJSON, bestForJSON]
    );

    return result.lastID;

  } catch (error) {
    console.error('Error inserting product:', error);
    throw error;
  } finally {
    await db.close();
  }
}

async function addMultipleProducts(products) {
  const db = await getDBConnection();

  try {
    await db.run('BEGIN TRANSACTION');
    for (const product of products) {
      const { name, description, price, imageUrl, categoryId, mainAccords, bestFor } = product;
      const mainAccordsJSON = JSON.stringify(mainAccords);
      const bestForJSON = JSON.stringify(bestFor);

      await db.run(
        `INSERT INTO products (name, description, price, image_url, category_id, main_accords, best_for) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, description, price, imageUrl, categoryId, mainAccordsJSON, bestForJSON]
      );
    }
    await db.run('COMMIT');

    console.log('Multiple products added successfully');
  } catch (error) {
    await db.run('ROLLBACK');
    console.error('Error inserting multiple products:', error);
    throw error;
  } finally {
    await db.close();
  }
}





module.exports = { getAll, getById, addProduct, addMultipleProducts };