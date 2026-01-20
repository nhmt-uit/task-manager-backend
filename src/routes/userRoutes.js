const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/authorizeMiddleware");
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
router.post("/", authorize("admin"), createUser); // Admin only
router.put("/:id", authorize("admin"), updateUser); // Admin only
router.delete("/:id", authorize("admin"), deleteUser); // Admin only

module.exports = router;
