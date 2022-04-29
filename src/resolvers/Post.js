module.exports = {
  Post: {
    likes: async (parent) => {
      const { likes } = await parent.populate("likes");
      return likes;
    },

    alreadyLiked: async (parent, _, { user }) => {
      return user ? parent.likes.includes(user._id) : false;
    },

    comments: async (parent) => {
      const { comments } = await parent.populate("comments");
      return comments;
    },

    postedBy: async (parent) => {
      const { postedBy } = await parent.populate("postedBy");
      return postedBy;
    },

    likeCount: async (parent) => {
      const { likes } = await parent.populate("likes");
      return likes.length;
    },

    commentCount: async (parent) => {
      const { comments } = await parent.populate("comments");
      return comments.length;
    },
  },
};
