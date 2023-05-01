const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
//gadnaas oor router huleej avna mergeParams: true
const router = express.Router();

//"/api/v1/categories"
router.route("/").get(
  asyncHandler(async (req, res, next) => {
    res.status(200).json({
      success: true,
      data: "Amjilttai",
    });
  })
);
module.exports = router;
