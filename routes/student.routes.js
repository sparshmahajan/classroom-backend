const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const { isStudent } = require("../middleware/student.middleware");
const { getScoreCard } = require("../controllers/student.controller");

router.get("/getscorecard", authMiddleware, isStudent, getScoreCard);

module.exports = router;