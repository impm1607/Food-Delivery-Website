const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://prachimakkar04_db_user:Pra1234@food-delivery-app.t4fnc7o.mongodb.net/food-delivery",
    )
    .then(() => {
      console.log("Connected to DB");
    });
};

module.exports = connectDB;
