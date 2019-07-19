const connection = require("../db/index.js")

//解密用的插件包
const JSEncrypt = require('node-jsencrypt');

const {
    createToken
} = require("../utils/index.js")

//测试接口
module.exports.Api = (req, res) => {
    res.send("server is running")
}


//token仓库
let tokenHistory = []

//获取token是否过期
function getTokenAuth (token) {
    for (let i = 0; i < tokenHistory.length; i++) {
      if (tokenHistory[i].token === token) {
        if (tokenHistory[i].auth) {
          tokenHistory[i].lastTime = new Date().getTime()
        }
        return tokenHistory[i].auth
      }
    }
    return false;
  }
  
  //删除过期的token
  function deleteTokenHistory(token) {
    for (let i = 0; i < tokenHistory.length; i++) {
      if (tokenHistory[i].token === token) {
        tokenHistory.splice(i, 1)
      }
    }
  }
  
  //定时检查token是否过期
//   setInterval(() => {
//     let now = new Date().getTime()
//     for (let i = 0; i < tokenHistory.length; i++) {
//       if (tokenHistory[i].auth && now - tokenHistory[i].lastTime > 30000) {
//         tokenHistory[i].auth = false
//       }
//     }
//     if (tokenHistory.length) {
//       console.log(tokenHistory)
//     }
//   }, 10000)
  





//登录接口
module.exports.Login = (req, res) => {
    let {
        user,
        pwd
    } = req.body;
    //console.log(req.body)
    //先把当时替换的加号在替换回来
    pwd = pwd.replace(/%2B/g, '+')
   //console.log(pwd)
    //解密
    var decrypt = new JSEncrypt();
    //注意这个k必须是对应的
    decrypt.setPrivateKey(`MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCV5ztx/nuinMLNPGuxJaafJzPRBWD2MD2zIgNfJqa3RwDKlOGsunMWAIDptMahFOnl+NTN1DVn8/I3ovsEnTURhAF2nosRGSoI1PJI/V+6ugHW2WzGaLqW9gAV8leAAEmIC/v7mlkaKUO0e8kMB24BkPZIqODh61CibtuQCNXQYLAmdbpWQBSKWBX7HBeEwOmOTOA0DqB0pUmO4XifT1/BE7hjdufKls5gtvSSzTdAfViSEmCUS/o2sWmdTLWoUiTMrCCzSJ5nepdbnJiZL8jdktyaxDtG60KYmirBOB9eh1QZPEoKMiZ75N6pwmZ0dzzgSWEi6TfScIWphyV6Fp7zAgMBAAECggEAGk+WyIBhVP5s1rcnM9Wm9EJePu7RwQRgoAN1Ugsnsf2dbvFI1xd2wcLe3aZkQru3/ix5tZLsuM1Bk3Bg3MN3IBbqZtaXFC41iY1O5W7Lkau6TOqmxAB3161gAHojz4y9W0q3NMc3onbhslkTxa+8KDw4bjJuHlk+MvSARzy1wrghDB6QbdJIPzV19dGggez/ICf6UrCgdmQuJAbFdHnoEK83qFSbBz5aljwWnMWTWvMJ0vN4SJXjiLwNMrOyKPkaeMulYFL2avFNeHhj/vzJL5R1bYWyFJ3mFQpSBVGUDfZoeCp5hDbwU6ERe2pjagPgsD2S72IhAEwKrlXUlemDQQKBgQDHA3gKdE47IlNrsqEmPiJHHoXY3Ix+4GPWT513DqwAAgxc0Sd/iFqHrxwAP7ZgohU4Eln/fCd9CsrOLqT9e3EETOjfSxFQjxC/RmcKkg4fXZZCXryx81OpjdTRT4v2mbpA0Hm/Kb4s0tT03vHrPeMOffiKefK0NQnbZfFvpQzk0wKBgQDA08WGesbUJKidTV0AjYNZQjJgXpYoRwneERxQiu7Ofxsc0oKbsYv5rZtKp7LjVkTyXUj8yhzJObVKm3qtoj8qvRhVMUhyPAiJJjFh+gcybV39jyvuq0zCv9n0ytuCfTfvPZEe/bsGCzhv71wuHNhxrkQ3St37APgf6wrzo+WJYQKBgEFoF3TAItH2hxo3PBVYiGV9V5odaiNs1gMiaWsurELYaX2709JrWu2LFJXUWrlJq9Wg2mlIQaYr/NlkpR8WCd/S8xooDsm+K0/h8I2d0PxoArFPd464nP91uMMN9L8YaQlSOyEjs/gBVrIf77xTu6MQrbW9PJITeGjeCUqbITC3AoGAXPX7dTC9qEqgC23fl0Oh/iceuD0BcRuGU0u2ddH0/RJkFMob80luLQmYIy6j3Fub06hLZqtdo1kx4G0CgLEGeOk+0Nt4jLIKf2wtRInQbGwzculSCbcFw6HQRuaBWvBZRfpNez5hqrFAHR6tNwHrCyszceCjEb5O4LxkxD7QiyECgYEAhujdPXQQcn7CqpY61ivxy03LCz4lW3R8xSJMtm1BY+iBp6P2GbgdKpbSXiTSr/Y3//8DwccLf47xc7Otcw6Yz+tcen88UxqHrI1myHltFNYkrbQ692PtszO8n3fta5bCPr8RY2ON3+uGYSHIDGyixAdxRQxkQPwMD0CFntHA2EA=`);

    //此时pwd就是解密出来的啦  然后在根据用户名去数据库找看看是否能不能找到这个用户
    //假如找到了 就解密数据库中这一项的密码  如果正确的话通知前端登录成功 否则通知前端密码不对
    pwd = decrypt.decrypt(pwd);

    console.log(user,pwd,"-----")


    //查询数据库是否有该用户存在
   const $sql = `select * from user where user="${user}"`

    connection.query($sql, (err, results) => {
        if (err) {
            //查询失败的时候
            res.statusCode = 500;
            res.send({
                code: 0,
                msg: err
            })
        } else {
            //查询成功  分该用户是否存在
            if (results.length) {
                //用户存在的时候

                //console.log(results,"查询到的那一项")
                //解密出来这个密码
                let mysqlPaddward=results[0].pas;
                mysqlPaddward = mysqlPaddward.replace(/%2B/g, '+')
                console.log(mysqlPaddward,"解密之前是什么")
                mysqlPaddward = decrypt.decrypt(mysqlPaddward);
                console.log(mysqlPaddward,"数据库解密")
                if(pwd===mysqlPaddward){
                     //根据每个存在对象生成对应的token
                const token = createToken(results[0].id)
                //并将这个token存到数据库里面去
                const $save = `update user set token="${token}" where id=${results[0].id}`

                connection.query($save, (err, results) => {
                    if (err) {
                        return console.error(err);
                    }
                })
                //这个数组是用来处理token的权限的 如果用户在某一个网页长时间不操作下次刷新的时候强制退出

                tokenHistory.push({
                    token: token,
                    lastTime: new Date().getTime(),
                    auth: true
                  });

                  console.log(tokenHistory,"储存器")

                res.statusCode = 200;
                res.json({
                    code: 1,
                    token, //登录成功的时候给前端发送令牌
                    msg: "success"
                })
                }else{
                    res.send({
                        code:0,
                        msg:"该用户名与密码不匹配"
                    })
                }
               
            } else {
                //该用户不存在的时候
                res.statusCode = 422; //说明用户没有权限访问
                res.json({
                    code: 0,
                    msg: "用户密码不正确"
                })
                return console.error(err)
            }

        }
    })


}


//注册接口处理

//封装一个函数用来判断数据库里面是否有这个用户

function judgeUser(user) {
    return new Promise((resolve, reject) => {
        //查询数据库
        const $sql = `select * from user where user='${user}'`;
        connection.query($sql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports.Registry = async (req, res) => {
    let {
        username,
        password
    } = req.body;
    //获取用户传过来的用户名去数据库里面查询是否存在这个名字
    //存在的话就要注册失败  否则的话注册成功
    try {
        let userObj = await judgeUser(username);
        console.log(userObj, "成功")
        if (userObj.length) {
            //如果查询到的话证明该用户已经存在了 所以要提示用户已经存在了
            res.statusCode = 401;
            res.json({
                code: 0,
                msg: "该用户已经存在了"
            })
        } else {
            //如果查询不到话证明该用户可以注册
            const $saveUser = `insert into user(user,pas) values ('${username}','${password}')`;
            connection.query($saveUser, (error, results) => {
                if (error) {
                    console.log(error)
                    res.statusCode = 500;
                    res.json({
                        code: 0,
                        msg: "注册失败"
                    })
                } else {
                    res.send({
                        code: 1,
                        msg: results
                    })
                }
            })

        }

    } catch (error) {
        res.statusCode = 500;
        res.json({
            code: 0,
            msg: "查询失败，请重试"
        })
        console.log(error, "失败")
    }

}