const Category = require("../model/category");
const CustomError = require("../utils/CustomError");
const asyncHandler = require("../middleware/asyncHandler");
exports.getCategory = asyncHandler(async (req, res, next) => {});
exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  return res.status(200).json({
    success: true,
    category,
  });
});
exports.getCategories = asyncHandler(async (req, res, next) => {
  const category = await Category.find();
  if (!category) {
    CustomError("Category value is null", 404);
  }
  res.status(200).json({
    success: true,
    count: category.length,
    data: category,
  });
});
