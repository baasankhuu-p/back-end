const Comments = require("../model/comment");
const asyncHandler = require("../middleware/asyncHandler");
const Post = require("../model/posts");
exports.getComments = asyncHandler(async (req, res, next) => {
  const comment = await Comments.find().sort({ CreatedAt: -1 });
  res.status(200).json({
    success: true,
    count: comment.length,
    data: comment,
  });
});

exports.createComment = asyncHandler(async (req, res, next) => {
  const { Comment } = req.body;
  if (!Comment) {
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  const user = req.user;
  if (!req.user) {
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  let data = {
    Comment,
    user: req.user,
    post: post._id,
  };
  const comment = await Comments.create(data);
  return res.status(200).json({
    success: true,
    data: comment,
  });
});

exports.getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comments.find({ post: req.params.id }).sort({
    CreatedAt: -1,
  });
  let data = [];
  if (!comment && comment.length > 0) {
    CustomError("Comment not found ", 404);
  }

  res.status(200).json({
    success: true,
    data: comment,
  });
});
