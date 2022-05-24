const { gql } = require('apollo-server-express');

// 1.定义schema
const typeDefs = gql`

  directive @uppercase on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type Book {
    title:String @auth
    author: String @deprecated(reason: "Use newField.")
  }
  type User{
    username:String!,
    email:String! ,
    bio:String,
    image:String,
    token:String,
  }
  type UserPayload{
      user:User
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


  type Query {
    books: [Book],
    currentUser:User
  }

  type Mutation{
      login(user:LoginInput):UserPayload,
      createUser(user:CreateUserInput):UserPayload
  }
`;

module.exports = typeDefs