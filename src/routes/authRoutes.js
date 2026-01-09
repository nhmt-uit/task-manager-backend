const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} = require("../controllers/authController");

// Dont need protect
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/refresh-token", refreshToken);

module.exports = router;
