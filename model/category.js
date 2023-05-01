const mongoose = require("mongoose");
const datenow = require("../utils/dateNow");
const CatSchema = new mongoose.Schema({
  Name: {
    type: String,
    trim: true,
    maxLength: [250, "category is long max 250."],
    required: [true, "Category is name"],
  },
  CreatedAt: { type: Date, default: datenow(new Date()) },
});
module.exports = mongoose.model("Category", CatSchema);
