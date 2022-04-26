require("dotenv").config();
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server");

const typeDefs = require("./schema");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"));

const resolvers = {};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`🚀  Server ready at ${url}`));
