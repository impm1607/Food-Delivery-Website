const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies?.tokenUser;

  if (!token) {
    return res.json({
      success: false,
      message: "Unauthorized user, please login",
    });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);

    if (!verify) {
      return res.json({
        success: false,
        message: "Unauthorized user",
      });
    }

    req.body.id = verify.id;

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Server Error " + error,
    });
  }
};

module.exports = authMiddleware;
