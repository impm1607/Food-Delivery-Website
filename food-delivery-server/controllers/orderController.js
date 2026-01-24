const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order
const placeOrder = async (req, res) => {
  const frontEndUrl = process.env.NODE_FRONTEND_URL || "http://localhost:5173";

  const { id, items, amount, address } = req.body;

  try {
    const newOrder = new orderModel({
      userId: id,
      items: items,
      amount: amount,
      address: address,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(id, { cartData: {} });

    const line_items = items?.map((elm) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: elm?.name,
        },
        unit_amount: elm?.price * 100,
      },
      quantity: elm?.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 20 * 100,
      },
      quantity: 1,
    });

    // creating session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontEndUrl}/verify?success=true&orderId=${newOrder?._id}`,
      cancel_url: `${frontEndUrl}/verify?success=false&orderId=${newOrder?._id}`,
    });

    return res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something Went Wrong " + error,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.params;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({
        success: true,
        message: "Paid",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({
        success: false,
        message: "Not Paid",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: "Something Went Wrong - " + error,
    });
  }
};

// user orders for frontend
const usersOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.id });

    return res.json({
      success: true,
      message: "Successfully fetched orders",
      result: orders,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something Went Wrong - " + error,
    });
  }
};

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    return res.json({
      success: true,
      message: "Fetched data successfully",
      result: orders,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong - " + error,
    });
  }
};

// api for updating order status
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;

  try {
    await orderModel.findByIdAndUpdate(orderId, { status: status });

    return res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong - " + error,
    });
  }
};

module.exports = {
  placeOrder,
  verifyOrder,
  usersOrder,
  listOrders,
  updateStatus,
};
