const User = require("../models/userModel");

module.exports = {
  Query: {
    user: async (_, { username }) => {
      const user = await User.findOne({ username }).select(
        "name username avatar"
      );

      if (!user) return;

      return user;
    },
  },
};
