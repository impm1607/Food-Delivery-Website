const express = require("express");

const {
  addToCart,
  removeFromCart,
  getCart,
} = require("../controllers/cartController");

const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.get("/get", authMiddleware, getCart);

module.exports = router;
