const { gql } = require('apollo-server-express');

// 1.定义schema
const typeDefs = gql`

  directive @uppercase on FIELD_DEFINITION
  directive @auth on FIELD_DEFINITION

  type Book {
    title:String
    author: String @deprecated(reason: "Use newField.")
  }
  type User{
    username:String!,
    email:String! ,
    bio:String,
    image:String,
    token:String,
    following:Boolean
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

  input UpdateUserInput{
    username:String,
    password:String,
    email:String,
    bio:String,
    image:String,
  }
  #Article
  input ArticleInput{
    title:String!
    description:String!
    body:String!
    tagList:[String]
  }

  type Article{
    slug: String!,
    title:String!,
    description: String!,
    body: String!,
    tagList: [
      String!
    ],
    createdAt: String!,
    updatedAt: String!,
    favorited: Boolean,
    favoritesCount: Int,
    author: User
  }

  type ArticlePayload{
    article:Article
  }
  
  type ArticlesPayload{
    articles:[Article!],
    articlesCount:Int
  }

  type Query {
    books: [Book]@auth,
    currentUser:User @auth,
    articles(offset:Int = 0, limit:Int = 2):ArticlesPayload @auth
  }

  type Mutation{
      login(user:LoginInput):UserPayload,
      createUser(user:CreateUserInput):UserPayload,
      UpdateUser(user:UpdateUserInput):UserPayload @auth,
      createArticle(article:ArticleInput):ArticlePayload @auth,
  }
`;

module.exports = typeDefs