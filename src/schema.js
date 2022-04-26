const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    users: [User!]!
    user(username: String!): User
  }

  type Mutation {
    signup(
      name: String!
      username: String!
      email: String!
      password: String!
      avatar: String
    ): User!
    login(username: String!, password: String!): User!
  }

  type User {
    name: String!
    username: String!
    email: String!
    avatar: String
  }
`;

module.exports = typeDefs;
