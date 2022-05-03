const User = require("../models/userModel");
const Post = require("../models/postModel");

module.exports = {
  Query: {
    user: async (_, { username }) => {
      const user = await User.findOne({ username });

      if (!user) throw new Error("No user found!");

      return user;
    },

    post: async (_, { id }) => {
      const post = await Post.findById(id);

      if (!post) throw new Error("No post found!");

      return post;
    },

    feed: async (_, __, { user }) => {
      if (!user) throw new Error("Please authenticate!");

      const userIds = [user._id, ...user.following];

      const posts = await Post.find({
        postedBy: userIds,
      }).sort("-createdAt");

      if (!posts) return [];

      return posts;
    },
  },
};
