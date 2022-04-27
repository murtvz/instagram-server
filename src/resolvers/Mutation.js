const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Post = require("../models/postModel");
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
      const user = await User.findOne({ username }).select("+password");

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

    deleteUser: async (_, __, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      const deletedUser = await User.findByIdAndDelete(user._id);

      return deletedUser;
    },

    uploadAvatar: async (_, { url }, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      user.avatar = url;
      await user.save();

      return user;
    },

    //////////////////////////////
    // (Un)Follow
    follow: async (_, { id }, context) => {
      if (!context.user) throw new Error("Please authenticate!");

      // You cannot follow yourself
      if (context.user._id.toString() === id)
        throw new Error("You cannot follow yourself");

      // The user to follow
      const user = await User.findById(id);

      // Unfollow if already following
      if (context.user.following.includes(id)) {
        context.user.following = context.user.following.filter(
          (el) => el.toString() !== id
        );

        user.followers = user.followers.filter(
          (el) => el.toString() !== context.user._id.toString()
        );

        // Follow user
      } else {
        context.user.following.push(id);
        user.followers.push(context.user._id);
      }

      await user.save();
      await context.user.save();

      return user;
    },

    post: async (_, { url, caption }, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      const post = await Post.create({
        url,
        caption,
        postedBy: user._id,
      });

      return post;
    },

    deletePost: async (_, { id }, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      // Only delete if post is posted by auth user
      const post = await Post.findOneAndDelete({ postedBy: user._id, _id: id });

      if (!post) throw new Error("No post found");

      return post;
    },
  },
};
