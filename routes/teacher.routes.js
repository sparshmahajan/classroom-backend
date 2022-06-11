const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const { isTeacher } = require("../middleware/teacher.middleware");
const { getStudentList, addScore, getStudentScores } = require("../controllers/teacher.controller");

router.get("/studentlist", authMiddleware, isTeacher, getStudentList);
router.post('/addscore/:id', authMiddleware, isTeacher, addScore);
router.get('/studentscores/:id', authMiddleware, isTeacher, getStudentScores);

module.exports = router;