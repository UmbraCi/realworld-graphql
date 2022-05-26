```JS
//graph 查询命令
# query GetBooks {
#   books {
#     title
#     author
#   }
# }
# query getCurrentUser{
#   currentUser {
#     email,
#     username,
#     image
#   }
# }
# mutation createUser{
#   createUser(user:{
#     username:"shichong",
#     email:"shichong@qq.com",
#     password:"password" 
#   }){
#     user{
#       email,
#       bio,
#       image,
#       token,
#     }
#   }
# }

# mutation login{
#   login(user:{email:"shichong@qq.com",password:"password"}){
#     user{
#       email @skip(if:true),
#       bio,
#       image,
#       token,
#     }
#   }
# }

# mutation UpdateUser{
#   UpdateUser(user:{
#     password:"123456789",
#     email:"change@qq.com"
#   }){
#     user{
#       email
#     }
#   }
# }
# mutation createArticle{
#   createArticle(article:{
#     title: "title882228",
#     description: "desc",
#     body: "body",
#     tagList: ["tag1"
#     ]
#   }){
#     article{
#       title,
#       author{
#         username
#       }
#     }
#   }
# }
query articles{
  articles(offset:4, limit:2){
      articles {
        title,
        createdAt
        author {
          username
        }
      },
      # articlesCount
  },
}
```
