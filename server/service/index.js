
//废弃了  把这个东西移到了routes里面的index.js里面去了


const bodyParser = require("body-parser")
const {Api,Login}=require("../controller/user.js")


module.exports = function (app) {
    app.get("/api",Api)
    app.post("/user/login", bodyParser.json(),Login)
}