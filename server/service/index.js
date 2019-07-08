
const bodyParser=require("body-parser")

module.exports=function(app){
    app.post("/user/login",bodyParser.json(),(req,res)=>{
        console.log(req.body);
        res.send({code:1})
    })  
}