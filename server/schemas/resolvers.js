const {
  User,
  Participant,
  Comment
} = require('../models');

const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
      // User Queries
      me: async (parent, args, context) => {
        if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
            .select('-__v -password')
            .populate('pxEntered');

          return userData;
        }

        throw new AuthenticationError('Not Logged In');
      },

      users: async () => {
        return User.find()
        .select('-__v -password')
        .populate('pxEntered');
      },

      user: async (parent, { username }) => {
        const params = username ? { username } : {};
        return User.findOne(params)
        .select('-__v -password')
        .populate('pxEntered');
      },

      // Participant Queries
      participants: async (parent, { username }) => {
        const params = username ? { username } : {};
        return Participant.find(params).sort({ createdAt: -1 });
      }

      
      // Comment Queries
    },

    Mutation: {

      // Add New Uer and Login
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user };
      },

      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });

        if (!user) {
          throw new AuthenticationError('Incorrect Username');
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new AuthenticationError('Incorrect Password');
        }

        const token = signToken(user);
        return { token, user };
      },

      // Partcipant Mutations
      addParticipant: async (parent, args, context) => {
        if (context.user) {
          const participant = await Participant.create({...args, username: context.user.username});

          await User.findByIdAndUpdate(
            { _id: context.user._id},
            { $push: { pxEntered: participant._id }},
            { new: true }
          );

          return participant;
        }

        throw new AuthenticationError('You need to be logged in');
      },

      // Error with the comment portion mutation
      addComment: async (parent, { participantId, commentType, commentBody }, context) => {
        if (context.user) {
          const updatedPx = await Participant.findOneAndUpdate(
            { _id: participantId },
            { $push: { comment: { commentType, commentBody, username: context.user.username }}},
            { new: true, runValidators: true }
          );
        
        return updatedPx;

        }

        throw new AuthenticationError('You need to be logged in');
      }
    }
  };

module.exports = resolvers;