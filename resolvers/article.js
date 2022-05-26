const resolvers = {
    Query:{
        async articles(parent, {offset, limit}, {dataSources}){
            const articles = await dataSources.articles.getArticles({offset, limit})
            return {
                articles
            }
            // const [articles,articlesCount] = await Promise.all([
            //     dataSources.articles.getArticles({offset, limit}),
            //     dataSources.articles.getArticleCount()
            // ])
            // return {
            //     articles,articlesCount
            // }
            // return {}
        }
    },
    Mutation:{
        async createArticle(parent, { article }, { user, dataSources }){
            article.author = user._id
            const res = await dataSources.articles.createArticle(article)
            // console.log(res)
            return {
                article:res
            }
        }
    },
    //Resolver链查询
    Article:{
        async author(parent, args, { dataSources }){
            let userData = await dataSources.users.findById(parent.author)
            return {
                ...userData.toJSON()
            }
        }
    },
    ArticlesPayload:{
        async articlesCount (parent, args, { dataSources }) {
            const count = await dataSources.articles.getArticleCount()
            return count
          }
    }
}

module.exports = resolvers;