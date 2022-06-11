const express = require("express");
const router = express.Router();

const { login } = require("../controllers/auth.controller");

router.post("/:item/login", login);

module.exports = router;