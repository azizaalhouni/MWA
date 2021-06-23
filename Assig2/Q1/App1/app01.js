//Add

const express = require("express");
const app = express();
//Listen
app.set("port",5000);
app.get("/",function(req,res){
    console.log("GET received");
    res.send("Recieved your GET request");
});
const server = app.listen(app.get("port"),function(){
    const port = server.address().port;
    console.log("Listening to port "+ port);
});

