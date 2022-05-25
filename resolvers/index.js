const userResolvers = require('./user')
const ArticleResolvers = require('./article')

const resolvers = [
  userResolvers,
  ArticleResolvers
]

module.exports = resolvers;