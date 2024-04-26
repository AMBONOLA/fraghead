const {renderAdminPage} = require("../controllers/adminController");

const router = require("express").Router();

router.get('/admin', renderAdminPage);

module.exports = { router };