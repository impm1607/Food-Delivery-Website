const foodModel = require("../models/foodModel");
const fs = require("fs");

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const { name, description, price, category } = req.body;

  const food = new foodModel({
    name: name,
    description: description,
    price: price,
    category: category,
    image: image_filename,
  });

  try {
    await food.save();
    return res.json({
      success: true,
      message: "Food added successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});

    return res.json({
      success: true,
      message: "Foods fetched successfully",
      result: foods,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// delete food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.params.id);

    return res.json({
      success: true,
      message: "Food deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

module.exports = { addFood, listFood, removeFood };
