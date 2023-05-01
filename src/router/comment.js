const express = require("express");
const { defend } = require("../middleware/defend");
const {
  getComments,
  createComment,
  getComment,
} = require("../controller/comment");
//gadnaas oor router huleej avna mergeParams: true
const router = express.Router();

//"/api/v1/comment"
router.route("/").get(getComments);
router.route("/:id").get(getComment).post(defend, createComment);
module.exports = router;
