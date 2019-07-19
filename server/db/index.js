//数据库连接
const mysql=require("mysql");

var connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"shu"//数据库名称
})

connection.connect((error) => {
    if (error) {
      console.log('数据库连接失败,详情：',error)
    } else {
      console.log('数据库连接成功')
    }
  })
  
  module.exports = connection