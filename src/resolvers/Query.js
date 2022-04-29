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
  },
};
