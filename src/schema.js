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

    deleteUser: User

    uploadAvatar(url: String!): User

    follow(id: ID!): User!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    avatar: String
    bioText: String
    bioLink: String
    followers: [User!]!
    following: [User!]!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
