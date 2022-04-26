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
    ): AuthPayload
    login(username: String!, password: String!): AuthPayload
  }

  type User {
    name: String!
    username: String!
    avatar: String
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
