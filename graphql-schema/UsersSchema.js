const graphql = require('graphql');
const _ = require('lodash');
// const Book = require('../models/book');
// const Author = require('../models/author');
const UserToken = require('../models/User/UserToken');
const UserProfile = require('../models/User/UserProfile');
const User = require('../models/User/User');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
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
            type: UserTokenType,
            resolve: async (parent, args) => {
                return await UserToken.find({user_id: parent.id});
            }
        },
        profile: {
            type: UserProfileType,
            resolve: async (parent, args) => {
                return await UserProfile.findOne({user_id: parent.id});
            }
        }
    })
});

const UserTokenType = new GraphQLObjectType({
    name: 'UserToken',
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

const UserProfileType = new GraphQLObjectType({
    name: 'UserProfile',
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
        users: {
            type: new GraphQLList(UserType),
            resolve: async(parent, args) => {
                // let users = await User.find();

                // for(var i = 0; i < users.length; i++) {
                //     users[i].is_deleted = users[i].is_deleted === 1  ? true: false;
                // }
                // console.log('users', users)
                return await User.find();
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve: async (parent, args) => {
                console.log('parent', parent)
                return await User.findById(args.id)
                // return Book.findById(args.id);
            }
        },
        // author: {
        //     type: AuthorType,
        //     args: { id: { type: GraphQLID } },
        //     resolve(parent, args) {
        //         // return _.find(authors, { id: args.id });
        //         return Author.findById(args.id);
        //     }
        // },
        // books: {
        //     type: new GraphQLList(BookType),
        //     resolve(parent, args) {
        //         // return books;
        //         return Book.find({});
        //     }
        // },
        // authors: {
        //     type: new GraphQLList(AuthorType),
        //     resolve(parent, args) {
        //         // return authors
        //         return Author.find({});
        //     }
        // }
    }
})

// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addAuthor: {
//             type: AuthorType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 age: { type: new GraphQLNonNull(GraphQLInt) }
//             },
//             resolve(parent, args) {
//                 let author = new Author({
//                     name: args.name,
//                     age: args.age
//                 });

//                 return author.save();
//             }
//         },
//         addBook: {
//             type: BookType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) },
//                 genre: { type: new GraphQLNonNull(GraphQLString) },
//                 authorId: { type: new GraphQLNonNull(GraphQLID) }
//             },
//             resolve(parent, args) {
//                 let book = new Book({
//                     name: args.name,
//                     genre: args.genre,
//                     authorId: args.authorId
//                 })

//                 return book.save();
//             }
//         }
//     }
// })

module.exports = new GraphQLSchema({
    query: RootQuery
    // mutation: Mutation
})

