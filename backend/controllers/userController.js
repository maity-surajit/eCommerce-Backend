const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const sendToken = require("../utils/jwtToken");

// Register user

exports.registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is a sample id",
      url: "profile_url",
    },
  });

  sendToken(user, 201, res);
});

// Login user

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // checking the email and password field

  if (!email || !password) {
    return next(new ApiError("Please enter the email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ApiError("Invalid email or password", 401));
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ApiError("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout user

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out successfully",
  });
});
