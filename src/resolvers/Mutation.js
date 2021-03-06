const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Comment = require("../models/commentModel");
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

      if (!user) throw new Error("No user found!");

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

    likePost: async (_, { id }, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      const post = await Post.findById(id);

      if (!post) throw new Error("No post found");

      // Remove like if already liked
      if (post.likes.includes(user._id)) {
        post.likes = post.likes.filter(
          (el) => el.toString() !== user._id.toString()
        );
        // like post
      } else {
        post.likes.push(user._id);
      }

      await post.save();

      return post;
    },

    deletePost: async (_, { id }, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      // Only delete if post is posted by auth user
      const post = await Post.findOneAndDelete({ postedBy: user._id, _id: id });

      if (!post) throw new Error("No post found");

      return post;
    },

    comment: async (_, { body, postId }, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      const comment = await Comment.create({
        body,
        postId,
        commentedBy: user._id,
      });

      return comment;
    },

    likeComment: async (_, { id }, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      const comment = await Comment.findById(id);

      if (!comment) throw new Error("No comment found!");

      // If already liked, remove like
      if (comment.likes.includes(user._id)) {
        comment.likes = comment.likes.filter(
          (el) => el.toString() !== user._id.toString()
        );
        // Like comment
      } else {
        comment.likes.push(user._id);
      }

      await comment.save();

      return comment;
    },

    deleteComment: async (_, { id }, { user }) => {
      if (!user) throw new Error("please authenticate!");

      // Only delete if commented by auth user
      const comment = await Comment.findOneAndDelete({
        commentedBy: user._id,
        _id: id,
      });

      if (!comment) throw new Error("No comment found!");

      return comment;
    },
  },
};
