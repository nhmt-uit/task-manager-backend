const express = require("express");
const Task = require("../models/Task");
const {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  assignTask,
  deleteTask
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { checkOwnership } = require("../middleware/ownershipMiddleware");
const { authorize } = require("../middleware/authorizeMiddleware");

const router = express.Router();

// ================================= //
// Easy way to use "protect"
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, checkOwnership(Task), updateTask);
router.patch("/:id/status", protect, checkOwnership(Task, 'createdBy'), updateTaskStatus);
router.patch("/:id/assign", protect, authorize("admin"), assignTask); // Admin only
router.delete("/:id", protect, checkOwnership(Task, 'createdBy'), deleteTask);

module.exports = router;
