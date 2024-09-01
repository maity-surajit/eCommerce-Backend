const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")


exports.isAuthenticateUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if(!token) {
    return next(new ApiError("Please Login to access this resourse", 401))
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
  
});
