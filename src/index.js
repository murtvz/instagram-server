require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

const typeDefs = require("./schema");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const userResolver = require("./resolvers/User");
const postResolver = require("./resolvers/Post");
const commentResolver = require("./resolvers/Comment");

const User = require("./models/userModel");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const resolvers = {
  ...Query,
  ...Mutation,
  ...userResolver,
  ...postResolver,
  ...commentResolver,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // Check if token is available
    const token = req.headers?.authorization?.split(" ")[1] ?? "";
    if (!token) return;

    // Verify token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // Check user in database
    const user = await User.findById(decoded.id).select("+password +email");
    if (!user) return;

    return { user };
  },
});

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
