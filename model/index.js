const mongoose = require('mongoose');
const { dbUrl } = require('../config/config.default')


mongoose.connect(dbUrl).then(()=>{
    console.log('数据库连接成功')
}).catch(error => {
    console.log('mongoDB 初始化链接失败',error)
});

mongoose.connection.on('error', err => {
    console.log('mongoDB链接出错',err)
});

// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));


//组织导出模型类
module.exports = {
    User:mongoose.model('User',require('./user')),
    Article:mongoose.model('Article',require('./article'))
}