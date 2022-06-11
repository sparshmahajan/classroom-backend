const express = require("express");
const router = express.Router();

const { authMiddleware } = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/admin.middleware");
const { addUser, getList, mapTeacher, mapStudent, removeUser, updateUser } = require("../controllers/admin.controller");

router.post("/:item", authMiddleware, isAdmin, addUser);
router.get("/:item/list", authMiddleware, isAdmin, getList);
router.post("/teacher/:teacherId/class/:classId", authMiddleware, isAdmin, mapTeacher);
router.post("/student/class/:classId", authMiddleware, isAdmin, mapStudent);
router.delete("/:item/:id", authMiddleware, isAdmin, removeUser);
router.put("/:item/:id", authMiddleware, isAdmin, updateUser);

module.exports = router;