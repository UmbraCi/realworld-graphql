const { MongoDataSource } = require('apollo-datasource-mongodb')

module.exports = class Users extends MongoDataSource {
    findByEmail(email){
        return this.model.findOne({
            email
        })
    }

    findByUserName(username){
        return this.model.findOne({
            username
        })
    }
}