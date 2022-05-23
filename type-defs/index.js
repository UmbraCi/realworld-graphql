const { gql } = require('apollo-server-express');

// 1.定义schema
const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type User{
    username:String!,
    email:String! ,
    bio:String,
    image:String
  }
  type UserPayload{
      user:User
  }

  type Query {
    books: [Book]
  }

  input LoginInput{
    email:String!,
    password:String!  
  }
  input CreateUserInput{
    username:String!,
    email:String!,
    password:String!  
  }

  type Mutation{
      login(user:LoginInput):UserPayload,
      createUser(user:CreateUserInput):UserPayload
  }
`;

module.exports = typeDefs