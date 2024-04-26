const { getDBConnection } = require('./db-connection');

class UserModel {
  constructor(user_id, name, email, password, user_type, created_at) {
    this.user_id = user_id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.user_type = user_type;
    this.created_at = created_at;
  }


  static async getAllUsers() {
    return [
      { user_id: 1, name: "John Doe", email: "john@example.com", user_type: "regular" },
      { user_id: 2, name: "Jane Smith", email: "jane@example.com", user_type: "admin" }
    ];
  }

  static async getUserById(userId) {
    return [
      { user_id: userId, name: "John Doe", email: "john@example.com", user_type: "regular" }
    ]
  }
}

module.exports = UserModel;

