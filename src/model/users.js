const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const datenow = require("../utils/dateNow");
const Users = new mongoose.Schema({
  username: {
    type: String,
    required: [true, ["Name is required"]],
    maxLength: [25, "Name is long"],
    minLength: [3, "Name is short"],
    trim: true,
  },
  photo: {
    type: String,
    default: "no-image.webp",
  },
  role: {
    type: String,
    default: "author",
  },
  email: {
    type: String,
    required: [true, "Mail is required"],
    maxLength: [50, "Email is long"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is incorrect. try again",
    ],
    unique: true,
  },
  phone: {
    type: Number,
    required: [true, "mobile phone is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: [4, "Password is short"],
    required: [true, "Password is required"],
    select: false,
  },
  CreatedDate: {
    type: Date,
    default: datenow(new Date()),
  },
  about: String,
});

Users.pre("save", async function () {
  //passiig oilgomjgui blgj oorchlnoo ingsneer hack-s baga zrg secure hgdj ognoo
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//JWT
Users.methods.getJsonWebToken = function () {
  const token = JWT.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRESIN,
    }
  );
  return token;
};
//User login pass check
Users.methods.CheckPass = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};
module.exports = mongoose.model("Users", Users);
