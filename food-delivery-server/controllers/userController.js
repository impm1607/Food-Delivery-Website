const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createToken(user._id);

    res.cookie("tokenUser", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    return res.json({
      success: true,
      message: "Login successfull",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong " + error,
    });
  }
};

// register user
const registerUSer = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // check already existing userr
    const exists = await userModel.findOne({ email });

    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // validate email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res.json({
        success: false,
        message:
          "Password must be at least 8 characters, and must contain a lowercase, uppercase letter, a number, and a symbol",
      });
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPass,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.cookie("tokenUser", token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    return res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong" + error,
    });
  }
};

const verifyUser = async (req, res) => {
  return res.json({
    success: true,
    message: "Authorized",
    id: req.body.id,
  });
};

const logOutUser = async (req, res) => {
  try {
    res.cookie("tokenUser", "", {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      // maxAge: 0,
      sameSite: "none",
    });

    // res.clearCookie("tokenUser");

    return res.send({
      success: true,
      message: "User Logged out successfully",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: "Server Error" + error,
    });
  }
};

module.exports = {
  loginUser,
  registerUSer,
  verifyUser,
  logOutUser,
};
