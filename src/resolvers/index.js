const Query = require("./Query");
const Mutation = require("./Mutation");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

const resolvers = {
  ...Query,
  ...Mutation,
  ...User,
  ...Post,
  ...Comment,
};

module.exports = resolvers;
