const { UserInputError } = require('apollo-server-express')
// 2.定义数据集
const books = [
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

const resolvers = {
    Query: {
      books: () => books,
    },
    Mutation:{
      async createUser(parent,{ user },{ dataSources }){
        // 判断用户是否存在
        const users = dataSources.users
        const email = await users.findByEmail(user.email)
        if(email){
            throw new UserInputError('邮箱已存在')
        }
        const username = await users.findByEmail(user.username)
        if(username){
          throw new UserInputError('用户已存在')
        }
        // 判断又想是否存在
        // 判断用户
        // 生成token
        
        return{
           user:{
            username:'username1',
            email:'email1',
            bio:'bio1',
            image:'image1'
           }
        }
      }
    }
  }; 

module.exports = resolvers;