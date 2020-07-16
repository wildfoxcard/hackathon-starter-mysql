const graphql = require("graphql");
const Client = require('../models/Client/Client')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql;


const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
      id: { type: GraphQLString },
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
          type: ClientTokenType,
          resolve: async (parent, args) => {
              return await UserToken.find({user_id: parent.id});
          }
      },
      profile: {
          type: ClientProfileType,
          resolve: async (parent, args) => {
              return await UserProfile.findOne({user_id: parent.id});
          }
      }
  })
});



const ClientTokenType = new GraphQLObjectType({
  name: 'ClientTokenType',
  fields: () => ({
      id: { type: GraphQLString },
      user_id: { type: GraphQLString },
      kind: { type: GraphQLString },
      accessToken: { type: GraphQLString },
      created_at: { type: GraphQLString },
      updated_at: { type: GraphQLString },
      is_deleted: { type: GraphQLBoolean }
  })
});

const ClientProfileType = new GraphQLObjectType({
  name: 'ClientProfileType',
  fields: () => ({
      id: { type: GraphQLString },
      user_id: { type: GraphQLString },
      name: { type: GraphQLString },
      gender: { type: GraphQLString },
      location: { type: GraphQLString },
      website: { type: GraphQLString },
      picture: { type: GraphQLString },
      created_at: { type: GraphQLString },
      updated_at: { type: GraphQLString },
      is_deleted: { type: GraphQLBoolean }
  })
});











const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    clients: {
      type: new GraphQLList(ClientType),
      resolve: async (parent, args) => {
        return await Client.find();
      },
    },
  },
});

//how the query will look:
// book(id: "123") {
//     name
//     genre
// }

module.exports = new GraphQLSchema({
  query: RootQuery,
});