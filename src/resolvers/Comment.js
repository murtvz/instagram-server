module.exports = {
  Comment: {
    commentedBy: async (parent) => {
      const { commentedBy } = await parent.populate("commentedBy");
      return commentedBy;
    },

    likes: async (parent) => {
      const { likes } = await parent.populate("likes");
      return likes;
    },
  },
};
