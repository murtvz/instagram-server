module.exports = {
  Post: {
    likes: async (parent) => {
      const { likes } = await parent.populate("likes");
      return likes;
    },

    comments: async (parent) => {
      const { comments } = await parent.populate("comments");
      return comments;
    },

    postedBy: async (parent) => {
      const { postedBy } = await parent.populate("postedBy");
      return postedBy;
    },
  },
};
