const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const { isTeacher } = require("../middleware/teacher.middleware");
const { getStudentList, addScore } = require("../controllers/teacher.controller");

router.get("/studentList", authMiddleware, isTeacher, getStudentList);
router.post('/addScore/:id', authMiddleware, isTeacher, addScore);

module.exports = router;