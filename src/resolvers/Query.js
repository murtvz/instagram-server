const User = require("../models/userModel");

module.exports = {
  Query: {
    user: async (_, { username }) => {
      const user = await User.findOne({ username });

      if (!user) throw new Error("No user found!");

      return user;
    },
  },
};
