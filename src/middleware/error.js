const ErrorHandler = (err, req, res, next) => {
  if (err.message.includes("Please enter your correct address")) {
    err.message = "Please enter your correct address";
  }
  if (err.name === "JsonWebTokenError" && err.message === "jwt malformed") {
    err.message = "You aren't logged in";
  }
  if (err.code) {
    err.message = "information duplicated";
  }
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
  next();
};
module.exports = ErrorHandler;
