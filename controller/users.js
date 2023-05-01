const User = require("../model/users");
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
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }

  const ok = await user.CheckPass(password);
  if (!ok) {
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
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
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});
