const { UserModel } = require('../models/user.model');


exports.getAllUsers = async (req, res) => {
  const users = await UserModel.getAllUsers();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await UserModel.getUserById(userId);
  res.json(user);
};