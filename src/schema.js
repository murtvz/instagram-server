const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query { # Type names should use PascalCase
    user(username: String!): User # Field names should use camelCase
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
    id: ID!
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
