const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
      select: false,
    },
    password: {
      type: String,
      minlength: 8,
      required: true,
      select: false,
    },
    avatar: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3BpZGVybWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    },
  },
  { timestamps: true }
);

// Middleware for hashing password
// Runs when User.create() or User.save() is invoked and only if password has been modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
