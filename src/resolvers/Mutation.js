const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = {
  Mutation: {
    signup: async (_, { name, username, email, password }) => {
      const user = await User.create({
        name,
        username,
        email,
        password,
      });

      const token = signToken(user._id);

      return {
        token,
        user,
      };
    },

    login: async (_, { username, password }) => {
      const user = await User.findOne({ username }).select(
        "password name avatar username"
      );

      // Check if user exists and password is correct
      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new Error("Invalid email or password!");

      // If user exists and password is valid, generate token
      const token = signToken(user._id);

      return {
        token,
        user,
      };
    },
  },
};
