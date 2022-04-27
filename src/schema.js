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
    post(url: String!, caption: String): Post
    likePost(id: ID!): Post
    deletePost(id: ID!): Post
    comment(body: String!, postId: ID!): Comment
    likeComment(id: ID!): Comment
    deleteComment(id: ID!): Comment
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
    posts: [Post!]!
    likedPosts: [Post!]!
  }

  type Post {
    id: ID!
    url: String!
    caption: String
    likes: [User!]!
    comments: [Comment!]!
    postedBy: User!
  }

  type Comment {
    id: ID!
    body: String!
    commentedBy: User!
    likes: [User!]!
    postId: Post!
  }

  type AuthPayload {
    token: String
    user: User
  }
`;

module.exports = typeDefs;
