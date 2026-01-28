const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

require("dotenv").config();

const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

// app config
const app = express();

const port = process.env.PORT || 8000;

// middlewares
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://food-delivery-website-dusky.vercel.app",
  "https://food-delivery-website-7mu8.vercel.app",
  "https://food-delivery-admindashboard-8p1t.onrender.com",
  "https://food-delivery-website-dswy.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   }),
// );

app.use(cookieParser());

// db connection
connectDB();

// api endpoints
app.use("/images", express.static("uploads"));

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`server started on port http://localhost:${port}`);
});
