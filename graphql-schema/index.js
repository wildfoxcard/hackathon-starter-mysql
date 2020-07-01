const { mergeSchemas } = require('graphql-tools');
const { GraphQLSchema } = require('graphql');

const UserSchema = require('./UsersSchema');
const ClientsSchema = require('./ClientsSchema');


module.exports = mergeSchemas({
    schemas: [UserSchema, ClientsSchema],
  });
  
// module.exports = new GraphQLSchema({
//     query: queryType
// });