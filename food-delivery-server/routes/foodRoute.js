const express = require("express");
const {
  addFood,
  listFood,
  removeFood,
} = require("../controllers/foodController");
const multer = require("multer");

const router = express.Router();

// image storage engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFood);

router.get("/list", listFood);

router.delete("/remove/:id", removeFood);

module.exports = router;
