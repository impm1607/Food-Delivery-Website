const express = require("express");
const authMiddleware = require("../middlewares/auth");
const {
  placeOrder,
  verifyOrder,
  usersOrder,
  listOrders,
  updateStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/verify/:orderId/:success", verifyOrder);
router.get("/user-orders", authMiddleware, usersOrder);
router.get("/list-orders", listOrders);
router.patch("/update-status", updateStatus);

module.exports = router;
