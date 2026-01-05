const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  refreshToken
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshToken);

// ================================= //
// Easy way to use "protect"
// router.get("/me", protect, getMe);

// ================================= //
// Router need to login
router.use(protect);
router.get("/me", getMe);

module.exports = router;
