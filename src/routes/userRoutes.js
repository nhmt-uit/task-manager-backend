const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);

// ================================= //
// Easy way to use "protect"
// router.get("/me", protect, getMe);

// ================================= //
// Router need to login
router.use(protect);
router.get("/me", getMe);

module.exports = router;
