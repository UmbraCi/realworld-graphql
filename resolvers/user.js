const { UserInputError } = require('apollo-server-express')
const jwt = require('../util/jwt')
const { jwtSecret } = require('../config/config.default')
const md5 = require('../util/md5')

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
    books(parent, args, context, info){
      console.log(context.user)
      return books
    },
    // books: (parent, args, context, info) => {
    //   console.log(context)
    //   // console.log('book=>',context.user)
    //   return books
    // }, 
    currentUser(parent, args, context, info){
      //获取当前登录的用户信息
      return context.user
    }
  },
  Mutation: {
    //注册
    async createUser(parent, { user }, { dataSources }) {
      // 判断用户是否存在 ， 判断邮箱是否存在
      const users = dataSources.users
      const email = await users.findByEmail(user.email)
      if (email) {
        throw new UserInputError('邮箱已存在')
      }
      const username = await users.findByUserName(user.username)
      if (username) {
        throw new UserInputError('用户已存在')
      }


      //保存到数据库
      const userData = await users.saveUser(user)
      // console.log(userData)
      // 生成token
      const token = await jwt.sign({
        id: userData._id,
      }, jwtSecret, {
        expiresIn: '1d'
      })

      return {
        user: {
          ...userData.toJSON(),
          token,
        }
      }
    },

    //登录
    async login(parent, { user } , { dataSources }) {
      //判断用户是否存在
      const userData = await dataSources.users.findByEmail(user.email)
      if(!userData){
        throw new UserInputError('用户不存在')
      }
      //密码是否正确
      if(userData.password !== md5(user.password)){
        throw new UserInputError('密码不正确')
      }
      //生成token
      const token = await jwt.sign({
        id: userData._id,
      }, jwtSecret, {
        expiresIn: '1d'
      })

      return {
        user: {
          ...userData.toJSON(),
          token,
        }
      }
    },

    //修改
    async UpdateUser(parent, { user:userInput }, { user, dataSources }) {
      if(userInput.password){
        userInput.password = md5(userInput.password)
      }
      const changedUser = await dataSources.users.UpdateUser(user._id,userInput)
      return {
        user:changedUser.toJSON()
      }
    }
  }
};



module.exports = resolvers;