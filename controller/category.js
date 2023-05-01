const Category = require("../model/category");
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
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  res.status(200).json({
    success: true,
    count: category.length,
    data: category,
  });
});
