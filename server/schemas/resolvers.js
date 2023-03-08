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
      }
    }
  };

module.exports = resolvers;