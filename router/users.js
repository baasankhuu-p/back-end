const express = require("express");
const { defend } = require("../middleware/defend");
const {
  getUsers,
  createUser,
  loginUser,
  getUser,
} = require("../controller/users");
//gadnaas oor router huleej avna mergeParams: true
const router = express.Router();

//"/api/v1/categories"
router.route("/").get(getUsers);
router.route("/signin").post(loginUser);
router.route("/signup").get(defend, getUsers).post(createUser);
router.route("/:id").get(defend, getUser).post(getUser);
module.exports = router;
