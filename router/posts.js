const express = require("express");
const { defend } = require("../middleware/defend");
const {
  getPosts,
  createPost,
  getPost,
  updatePost,
  getAuthPost,
} = require("../controller/posts");
//gadnaas oor router huleej avna mergeParams: true
const router = express.Router();

//"/api/v1/categories"
router.route("/").get(getPosts).post(defend, createPost);
router.route("/auth/:id").get(getAuthPost);
router.route("/:id").get(getPost).post(updatePost);
module.exports = router;
