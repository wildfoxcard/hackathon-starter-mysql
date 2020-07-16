const graphql = require("graphql");
const _ = require("lodash");
const UserToken = require("../models/User/UserToken");
const UserProfile = require("../models/User/UserProfile");
const User = require("../models/User/User");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password_reset_token: { type: GraphQLString },
    password_reset_expires: { type: GraphQLString },
    email_verification_token: { type: GraphQLString },
    email_verified: { type: GraphQLString },
    is_admin: { type: GraphQLBoolean },

    snapchat: { type: GraphQLString },
    facebook: { type: GraphQLString },
    twitter: { type: GraphQLString },
    google: { type: GraphQLString },
    github: { type: GraphQLString },
    instagram: { type: GraphQLString },
    linkedin: { type: GraphQLString },
    steam: { type: GraphQLString },
    twitch: { type: GraphQLString },
    quickbooks: { type: GraphQLString },
    created_at: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    is_deleted: { type: GraphQLBoolean },

    tokens: {
      type: UserTokenType,
      resolve: async (parent, args) => {
        return await UserToken.find({ user_id: parent.id });
      },
    },
    profile: {
      type: UserProfileType,
      resolve: async (parent, args) => {
        return await UserProfile.findOne({ user_id: parent.id });
      },
    },
  }),
});

const UserTokenType = new GraphQLObjectType({
  name: "UserToken",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    kind: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    is_deleted: { type: GraphQLBoolean },
  }),
});

const UserProfileType = new GraphQLObjectType({
  name: "UserProfile",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLString },
    name: { type: GraphQLString },
    gender: { type: GraphQLString },
    location: { type: GraphQLString },
    website: { type: GraphQLString },
    picture: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    is_deleted: { type: GraphQLBoolean },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args, request) => {
          console.log('args', args, request.session, request.user)
        return await User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, args) => {
        return await User.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    upsertUser: {
      type: UserType,
      args: {
        //user table
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        // is_admin: { type: GraphQLBoolean },
        snapchat: { type: GraphQLString },
        facebook: { type: GraphQLString },
        twitter: { type: GraphQLString },
        google: { type: GraphQLString },
        github: { type: GraphQLString },
        instagram: { type: GraphQLString },
        linkedin: { type: GraphQLString },
        steam: { type: GraphQLString },
        twitch: { type: GraphQLString },
        quickbooks: { type: GraphQLString },

        //user profile table
        name: { type: GraphQLString },
        gender: { type: GraphQLString },
        location: { type: GraphQLString },
        website: { type: GraphQLString },
        // picture: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = new User({
          id: args.id || undefined,
          email: args.email || undefined,
          password: args.password || undefined,
          // is_admin: args.email,
          snapchat: args.snapchat || undefined,
          facebook: args.facebook || undefined,
          twitter: args.twitter || undefined,
          google: args.google || undefined,
          github: args.github || undefined,
          instagram: args.instagram || undefined,
          linkedin: args.linkedin || undefined,
          steam: args.steam || undefined,
          twitch: args.twitch || undefined,
          quickbooks: args.quickbooks || undefined,
        });

        let returningUser = await user.save();

        let userProfileObj = await UserProfile.findOne({ user_id: args.id });
        if (userProfileObj) {
          let userProfile = new UserProfile(
            Object.assign(userProfileObj, {
              name: args.name || undefined,
              gender: args.gender || undefined,
              location: args.location || undefined,
              website: args.website || undefined,
            })
          );

          returningUser.profile = await userProfile.save();
        } else {
          let userProfile = new UserProfile({
            user_id: returningUser.id,
            name: args.name || undefined,
            gender: args.gender || undefined,
            location: args.location || undefined,
            website: args.website || undefined,
          });

          returningUser.profile = await userProfile.save();
        }

        return returningUser;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
