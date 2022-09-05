const graphql = require('graphql');
const Author=require('../models/author');
const Book=require('../models/book');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLList,GraphQLInt,GraphQLID,GraphQLString,GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        gener: { type: GraphQLString },
        author:{
            type:AuthorType,
            resolve(parent,args){
                //return _.find(authors,{id:parent.authorid})
        }
    }
    })
});


const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        book:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return _.filter(books,{authorid:parent.id})
            }
        }
    })
});


const RootQuery=new GraphQLObjectType({ 
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{ id: { type: GraphQLID }},
            resolve(parent,args){
                //return _.find(books,{id:args.id});
            }
        },
        author:{
            type:AuthorType,
            args:{ id: { type: GraphQLID }},
            resolve(parent,args){
                // return _.find(authors,{id:args.id});
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                //return books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                //return authors
            }
        }

    },

});

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
            },
            resolve(parent,args){
                let author= new Author({
                    name:args.name,
                    age:args.age
                });
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                gener:{type:GraphQLString},
            },
            resolve(parent,args){
                let book= new Book({
                    name:args.name,
                    gener:args.gener
                });
                return book.save();
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});