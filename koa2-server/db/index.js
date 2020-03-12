// db/index.js

const dbConfig = require('../config/index')
const mongoose = require('mongoose')

mongoose.connect(dbConfig.DB_URL, { useNewUrlParser: true }, function (err) {
  if (err) {
    console.log('Connection Error:' + err)
    return
  } else {
    console.log('Connection success!')
  }
})

mongoose.connection.on('connected', function(err) {
  if(err) {
    console.log(err)
    return
  }
  console.log('连接成功')
  console.log('Mongoose connection open to '+ dbConfig.DB_URL);
});
/**
* 连接异常 error 数据库连接错误
*/
mongoose.connection.on('error',function(err) {
 console.log('Mongoose connection error: '+ err);
});
/**
* 连接断开 disconnected 连接异常断开
*/
mongoose.connection.on('disconnected',function() {
 console.log('Mongoose connection disconnected');
});

module.exports = mongoose

