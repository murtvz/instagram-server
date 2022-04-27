module.exports = {
  User: {
    followers: async (parent) => {
      const user = await parent.populate("followers");
      return user.followers;
    },

    following: async (parent) => {
      const user = await parent.populate("following");
      return user.following;
    },
  },
};
