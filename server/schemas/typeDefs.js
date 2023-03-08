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
  }

  type Participant {
    _id: ID
    username: String
    pxFirstName: String
    pxLastName: String
    pxStatus: String
    pxAge: Int
    pxStudy: String
    pxStudyDate: String
    createdAt: String
    comment: [Comment]
  }

  type Comment {
    _id: ID
    username: String
    createdAt: String
    commentType: String
    commentBody: String
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
    addParticipant(pxFirstName: String!, pxLastName: String!, pxStatus: String!, pxAge: Int!, pxStudy: String!, pxStudyDate: String!): Participant
    addComment(participantId: ID!, commentType: String, commentBody: String): Participant
  }
`;

module.exports = typeDefs;