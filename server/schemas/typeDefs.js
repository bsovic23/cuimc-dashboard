const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    pxEnteredCount: Int
    pxEntered: [Participant]
    comments: [Comment]
  }

  type Participant {
    _id: ID
    pxFirstName: String
    pxLastName: String
    pxStatus: String
    pxAge: Int
    pxStudy: String
    pxStudyDate: String
    createdAt: String
  }

  type Comment {
    _id: ID
    commentBody: String
    commentType: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    participants(username: String): [Participant]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;