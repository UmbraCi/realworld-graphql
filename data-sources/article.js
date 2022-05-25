const { MongoDataSource } = require('apollo-datasource-mongodb')

module.exports = class Article extends MongoDataSource {
    async createArticle(data){
        const article = new this.model(data)
        // await article.populate('author')
        return article.save()
    }

    getArticles(options){
        return this.model.find().skip(options.offset).limit(options.limit)
    }

    getArticleCount(){
        return this.model.countDocuments()
    }
}