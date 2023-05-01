const User = require("../model/users");
const CustomError = require("../utils/CustomError");
const asyncHandler = require("../middleware/asyncHandler");
exports.getUsers = asyncHandler(async (req, res, next) => {
  const user = await User.find();
  res.status(200).json({
    success: true,
    count: user.length,
    data: user,
  });
});

exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  return res.status(200).json({
    token: user.getJsonWebToken(),
    success: true,
    data: user,
  });
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError("Email or password in null", 400);
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new CustomError("Email or password incorrect !", 400);
  }

  const ok = await user.CheckPass(password);
  if (!ok) {
    throw new CustomError("Email or password incorrect", 400);
  }
  res.status(200).json({
    success: true,
    token: user.getJsonWebToken(),
    user: user,
    login: true,
  });
});
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    CustomError("User not found ", 404);
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
