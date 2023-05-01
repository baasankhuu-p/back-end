const mongoose = require("mongoose");
const datenow = require("../utils/dateNow");
const CommentSchema = new mongoose.Schema({
  Comment: {
    type: String,
    trim: true,
    maxLength: [1000, "Comment is long max 1000."],
    required: [true, "Comment is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "Users",
    required: true,
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
  },
  CreatedAt: { type: Date, default: datenow(new Date()) },
});
module.exports = mongoose.model("Comment", CommentSchema);
