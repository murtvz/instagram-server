module.exports = {
  User: {
    followers: async (parent) => {
      const { followers } = await parent.populate("followers");
      return followers;
    },

    following: async (parent) => {
      const { following } = await parent.populate("following");
      return following;
    },

    posts: async (parent) => {
      const { posts } = await parent.populate("posts");
      return posts;
    },

    likedPosts: async (parent) => {
      const { likedPosts } = await parent.populate("likedPosts");
      return likedPosts;
    },
  },
};
