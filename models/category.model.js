const { getDBConnection } = require('./db-connection');

class CategoryModel {
  constructor(category_id, name, ordinal) {
    this.category_id = category_id;
    this.name = name;
    this.ordinal = ordinal;

  }

  static async getAll() {
    return [
      { category_id: 1, name: "Category 1", ordinal: 1 },
      { category_id: 2, name: "Category 2", ordinal: 2 }
    ];
  }

  static async getById(categoryId) {
    return [
      { category_id: categoryId, name: "Category 2", ordinal: 2 }
    ]
  }
}

module.exports = CategoryModel;
