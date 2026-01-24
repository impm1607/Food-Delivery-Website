const express = require("express");
const {
  loginUser,
  registerUSer,
  verifyUser,
  logOutUser,
} = require("../controllers/userController");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerUSer);

router.post("/login", loginUser);

router.get("/verify", authMiddleware, verifyUser);

router.get("/logout", logOutUser);

module.exports = router;
