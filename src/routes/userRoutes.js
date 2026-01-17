const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// ================================= //
// Easy way to use "protect"
// router.get("/me", protect, getMe);

// ================================= //
// Router need to login
router.use(protect);
router.get("/me", getMe);

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
