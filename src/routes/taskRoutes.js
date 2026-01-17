const express = require("express");
const Task = require("../models/Task");
const {
  createTask,
  getTasks,
  updateTask,
  updateTaskStatus,
  deleteTask
} = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { checkOwnership } = require("../middleware/ownershipMiddleware");

const router = express.Router();

// ================================= //
// Easy way to use "protect"
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, checkOwnership(Task), updateTask);
router.patch("/:id/status", protect, checkOwnership(Task, 'createdBy'), updateTaskStatus);
router.delete("/:id", protect, checkOwnership(Task, 'createdBy'), deleteTask);

module.exports = router;
