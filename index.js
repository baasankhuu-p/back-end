const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
var path = require("path");
const connectDB = require("./config/db");

// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: ".env" });
const LogServer = require("./middleware/LogServer");
const ErrorHandler = require("./middleware/error.js");
const colors = require("colors");

// Router оруулж ирэх
const userRoutes = require("./router/users");
const postRoutes = require("./router/posts");
const categoryRoutes = require("./router/category");
const commentRoutes = require("./router/comment");
const homeRoutes = require("./router/Home");
const app = express();
app.use(cors());
connectDB();
// Log bichij bui baidal
app.use(express.static("public"));
//Body Parser - Энэ нь шинээр req ирхэд exprfess.н json-д өгөх гэж
app.use(express.json());
app.use(LogServer);
app.use("/", homeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/comment", commentRoutes);
//err middleware
app.use(ErrorHandler);
const server = app.listen(
  process.env.PORT || 5000,
  console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `.rainbow)
);

//process.on Event
//unhandledRejection - Алдааны Event
//Universal err
process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
