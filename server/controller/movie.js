const connection = require("../db/index.js");



//获取电影列表
module.exports.MovieList = (req, res) => {
    let {
        page,
        limit
    } = req.query;
    //假如不传每页多少条数据这个变量 就把整个表的数据返回
    //传了就走limit那个筛选
    const $sql = limit == undefined ?
        `select * from movie` :
        `select * from movie limit ${page},${limit}`;
    connection.query($sql, (error, resault) => {
        if (error) {
            res.json({
                code: 0,
                msg: "暂无数据"
            })
        } else {
            res.send({
                code: 1,
                resault
            })
        }
    })

}

//获取电影的长度
module.exports.MovieLength = (req, res) => {
    connection.query('select count(*) as total from movie', (t_error, t_result) => {
        console.log(t_result);
        if (t_error) {
            res.json({
                code: 0,
                msg: "长度查询失败"
            })
            return error
        }
        res.json({
            code: 1,
            total: t_result[0].total
        })
    })
}