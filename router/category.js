const express = require("express");
const { defend } = require("../middleware/defend");
const {
  getCategories,
  createCategory,
  getCategory,
} = require("../controller/category");
//gadnaas oor router huleej avna mergeParams: true
const router = express.Router();

//"/api/v1/categories"
router.route("/").get(getCategories).post(defend, createCategory);
router.route("/:id").get(getCategory);
module.exports = router;
