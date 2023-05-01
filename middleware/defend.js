const CustomError = require("../utils/CustomError");
const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
exports.defend = asyncHandler(async (req, res, next) => {
  console.log("====>", req.headers.authorization);
  if (!req.headers.authorization) {
    throw new CustomError("You aren't authorized to perform this action", 400);
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token || token === "null") {
    throw new CustomError("Token value is null", 401);
  }
  const ObjToken = jwt.verify(token, process.env.JWT_SECRET);
  console.log("defend: ", ObjToken);
  req.user = ObjToken.id;
  req.email = ObjToken.email;
  next();
});
