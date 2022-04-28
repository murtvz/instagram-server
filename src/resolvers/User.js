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

    followerCount: async (parent) => {
      const { followers } = await parent.populate("followers");
      return followers.length;
    },

    followingCount: async (parent) => {
      const { following } = await parent.populate("following");
      return following.length;
    },

    alreadyFollowing: async (parent, _, { user }) => {
      return user ? user.following.includes(parent._id) : false;
    },

    followsMe: async (parent, _, { user }) => {
      return user ? parent.following.includes(user._id) : false;
    },

    posts: async (parent) => {
      const { posts } = await parent.populate({
        path: "posts",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      });
      return posts;
    },

    postCount: async (parent) => {
      const { posts } = await parent.populate("posts");
      return posts.length;
    },

    likedPosts: async (parent) => {
      const { likedPosts } = await parent.populate("likedPosts");
      return likedPosts;
    },
  },
};
