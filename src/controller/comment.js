const Comments = require("../model/comment");
const CustomError = require("../utils/CustomError");
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
    throw new CustomError("Comment is value null", 400);
  }
  const user = req.user;
  if (!req.user) {
    throw new CustomError(`Please log in again`, 400);
  }
  const post = await Post.findById(req.params.id);
  if (!post) {
    throw new CustomError(`No post found`, 400);
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
