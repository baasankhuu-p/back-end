const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
exports.defend = asyncHandler(async (req, res, next) => {
  console.log("====>", req.headers.authorization);
  if (!req.headers.authorization) {
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token || token === "null") {
    res.status(401).json({
      success: false,
      data: "Алдаа гарлаа",
    });
  }
  const ObjToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log("defend: ", ObjToken);
  req.user = ObjToken.id;
  req.email = ObjToken.email;
  next();
});
