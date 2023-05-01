const Post = require("../model/posts");
const User = require("../model/users");
const CustomError = require("../utils/CustomError");
const asyncHandler = require("../middleware/asyncHandler");
exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("auth").sort({ CreatedAt: -1 });
  if (!posts) {
    CustomError("Post is null", 404);
  }
  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts,
  });
});
exports.createPost = asyncHandler(async (req, res, next) => {
  console.log(req.user);
  const user = await User.findById(req.user);
  if (!user) {
    throw new CustomError(`No user found with this ID-${req.user} ..`, 400);
  }
  const post = await Post.create(req.body);
  post.auth = req.user;
  post.save();
  return res.status(200).json({
    success: true,
    data: post,
  });
});
exports.getPost = asyncHandler(async (req, res, next) => {
  const posts = await Post.findById(req.params.id).populate("auth");
  if (!posts) {
    CustomError("Post value is null", 404);
  }
  res.status(200).json({
    success: true,
    data: posts,
  });
});
exports.getAuthPost = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ auth: req.params.id });
  if (!posts) {
    CustomError("Post value is null", 404);
  }
  res.status(200).json({
    success: true,
    data: posts,
  });
});
exports.updatePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true, //Шинэчлэгдсэн мэдээллийг өгнө
    runValidators: true, //Баз үүсгэж байхдаа гаргаж байасн шалгалтыг бас шалгаж өгөөрэй гэж хэлж өгнө,
  });
  //defend turuulj ajilsnii daraa user-n id oldh yum

  res.status(200).json({
    success: true,
    data: post,
  });
});
