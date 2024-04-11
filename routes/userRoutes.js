import { getAllUsers, getUserById } from '../controllers/userController';
const router = require("express").Router();



router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
module.exports = { router };