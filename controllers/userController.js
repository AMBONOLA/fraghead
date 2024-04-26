const { getAllUsers, getUserById } = require('../models/user.model');


exports.getAllUsers = async (req, res) => {
  const users = await getAllUsers();
  res.json(users);
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  const user = await getUserById(userId);
  res.json(user);
};