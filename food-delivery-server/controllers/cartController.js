const userModel = require("../models/userModel");

// add items to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.id);

    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.id, { cartData });

    return res.json({
      success: true,
      message: "Added To Cart",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong " + error,
    });
  }
};

// remove items from cart
const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.id);

    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.id, { cartData });

    return res.json({
      success: true,
      message: "Removed From Cart",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong " + error,
    });
  }
};

// fetch user cart
const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.id);

    let cartData = await userData.cartData;

    return res.json({
      success: true,
      message: "Fetched Cart Data",
      result: cartData,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong " + error,
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
};
