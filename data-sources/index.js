const dbModel = require('../model')
const Users = require('./user')
const Article = require('./article')
const Tag = require('./tag')

module.exports = ()=>{
    return {
        users:new Users(dbModel.User),
        articles:new Article(dbModel.Article),
    }
}