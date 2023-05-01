const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const User = require("./model/users");
const Category = require("./model/category");
const Post = require("./model/posts");
const Comment = require("./model/comment");
dotenv.config({ path: "./config/config.env" });

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const users = JSON.parse(
  fs.readFileSync(__dirname + "/data/users.json", "utf-8")
);
const posts = JSON.parse(
  fs.readFileSync(__dirname + "/data/posts.json", "utf-8")
);
const category = JSON.parse(
  fs.readFileSync(__dirname + "/data/category.json", "utf-8")
);
const importData = async () => {
  try {
    await User.create(users);
    // await Post.create(posts);
    // await Category.create(category);
    console.log("Data inserted....".green.inverse);
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    // await User.deleteMany();
    // await Category.deleteMany();
    // await Post.deleteMany();
    await Comment.deleteMany();
    console.log("Data deleted....".red);
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
