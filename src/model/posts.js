const mongoose = require("mongoose");
const datenow = require("../utils/dateNow");
const PostSchema = new mongoose.Schema({
  Title: {
    type: String,
    trim: true,
    maxLength: [250, "Post is long max 250."],
    required: [true, "Post is required"],
  },
  Banner: {
    type: String,
    trim: true,
    maxLength: [250, "Banner Url is long max 250"],
    required: [true, "Banner image is required"],
  },
  url: {
    type: String,
    trim: true,
    maxLength: [250, "Read documentation is long max 250"],
  },
  content: {
    type: String,
    trim: true,

    minLength: [50, "Content is short min 50"],
    required: [true, "Content is required"],
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: [true, "Requried Category selected"],
  },
  CreatedAt: { type: Date, default: datenow(new Date()) },
  vote: { type: Number, default: 0 },
  auth: { type: mongoose.Schema.ObjectId, ref: "Users" },
  //   ....
});
module.exports = mongoose.model("Post", PostSchema);
